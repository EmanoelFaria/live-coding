const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserClass = require('./User');
const User = new UserClass();

class Auth {
  static async encrypt(text) {
    const salt = await this.generateSalt();
    const hash = await bcrypt.hash(text, salt);
    return hash;
  }

  static async compare(text, hash) {
    return await bcrypt.compare(text, hash);
  }

  static generateSalt() {
    const saltRounds = 10;
    return bcrypt.genSalt(saltRounds);
  }

  static generateAccessToken(data) {
    return jwt.sign(data, process.env.AUTH_SECRET);
  }

  static invalidateAccessToken(clientId, newAccessToken) {
    return User.updateByClientId(clientId, { accessToken: newAccessToken });
  }

  static async _getAccessTokenData(accessToken) {
    try {
      const accessTokenData = jwt.verify(accessToken, process.env.AUTH_SECRET);
      await this._validateNewestAccessToken(accessTokenData.clientId, accessToken);
      return accessTokenData;
    } catch (error) {
      if (error instanceof AuthError) throw new Error(error);
      throw new InvalidAccessToken();
    }
  }

  static async _validateNewestAccessToken(clientId, receivedAccessToken) {
    const user = await User.getOneByClientId(clientId);
    if (user.accessToken != receivedAccessToken) throw new WrongAccessToken(user.updatedAt);
    return;
  }

  static _validateMethodAndResourcePermission(userPermissions, askedMethod, askedResource) {
    const hasPermission = userPermissions.some(
      (permission) => permission.resource == askedResource && permission.method == askedMethod
    );

    if (!hasPermission) throw new PermissionNotFoundAuthError(askedMethod, askedResource);

    return;
  }

  static async validateAccessToken(accessToken, method, resource) {
    const accessTokenData = await this._getAccessTokenData(accessToken);
    this._validateMethodAndResourcePermission(accessTokenData.permissions, method, resource);
    return;
  }
}

class AuthError extends Error {
  constructor(msg) {
    super(msg);
  }
}

class WrongAccessToken extends AuthError {
  constructor(date) {
    super(`You have changed your Access Token at: ${date}`);
  }
}

class InvalidAccessToken extends AuthError {
  constructor() {
    super('Invalid Access Token');
  }
}

class PermissionNotFoundAuthError extends AuthError {
  constructor(method, resource) {
    super(`You don't have permission to access ${method} /${resource} `);
  }
}

module.exports = { Auth, InvalidAccessToken, WrongAccessToken, AuthError };
