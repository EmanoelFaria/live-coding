const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./User');
const UserModel = new User();

class Auth {
  static async signUp(newUser) {
    const password = await Auth._encrypt(newUser.password);
    const accessToken = await Auth._generateAccessToken(
      this._sanitizeUserDataForAccessToken(newUser)
    );
    await UserModel.createOne({ ...newUser, password, accessToken });
    delete newUser['password'];
    return { ...newUser };
  }

  static async signIn(receivedUser) {
    const user = await UserModel.getOneByUsername(receivedUser.username);
    await this._validateReceivedPassword(receivedUser.password, user.password);
    const newAccessToken = await Auth._generateAccessToken(
      this._sanitizeUserDataForAccessToken(user)
    );
    await Auth._updateAccessToken(user.username, newAccessToken);
    return { accessToken: newAccessToken };
  }

  static async updatePermissions(userId, updatedUser) {
    await UserModel.updatePermissions(userId, updatedUser);
    const newUser = await UserModel.getOneById(userId);
    const newAccessToken = await Auth._generateAccessToken(
      this._sanitizeUserDataForAccessToken(newUser)
    );
    await Auth._updateAccessToken(newUser.username, newAccessToken);

    return newUser;
  }

  static async validateAccessToken(accessToken, method, resource) {
    this._validateMalformedAccessToken(accessToken);
    await this._validateNewestAccessToken(accessToken, accessToken);
    const accessTokenData = await this._getAccessTokenData(accessToken);
    this._validateMethodAndResourcePermission(accessTokenData.permissions, method, resource);
    return;
  }

  static async _encrypt(text) {
    const salt = await this._generateSalt();
    const hash = await bcrypt.hash(text, salt);
    return hash;
  }

  static async _compare(text, hash) {
    return await bcrypt.compare(text, hash);
  }

  static _generateSalt() {
    const saltRounds = 10;
    return bcrypt.genSalt(saltRounds);
  }

  static _generateAccessToken(data) {
    return jwt.sign(data, process.env.AUTH_SECRET);
  }

  static _updateAccessToken(username, newAccessToken) {
    return UserModel.updateByUsername(username, { accessToken: newAccessToken });
  }

  static _getAccessTokenData(accessToken) {
    return jwt.verify(accessToken, process.env.AUTH_SECRET);
  }

  static _validateMalformedAccessToken(accessToken) {
    try {
      return this._getAccessTokenData(accessToken);
    } catch (error) {
      throw new InvalidAccessTokenAuthError();
    }
  }

  static async _validateNewestAccessToken(accessToken, receivedAccessToken) {
    const data = this._getAccessTokenData(accessToken);
    const user = await UserModel.getOneByUsername(data.username);
    if (user.accessToken != receivedAccessToken)
      throw new WrongAccessTokenAuthError(user.updatedAt);
    return;
  }

  static _validateMethodAndResourcePermission(userPermissions, askedMethod, askedResource) {
    const hasPermission = userPermissions.some(
      (permission) => permission.resource == askedResource && permission.method == askedMethod
    );

    if (!hasPermission) throw new PermissionNotFoundAuthError(askedMethod, askedResource);

    return;
  }

  static async _validateReceivedPassword(receivedToken, userToken) {
    const isValidToken = await Auth._compare(receivedToken, userToken);
    if (!isValidToken) throw new InvalidUsernameOrPasswordAuthError();
    return;
  }

  static _sanitizeUserDataForAccessToken(user) {
    return {
      username: user.username,
      permissions: user.permissions,
    };
  }
}

class AuthError extends Error {
  constructor(msg) {
    super(msg);
  }
}

class WrongAccessTokenAuthError extends AuthError {
  constructor(date) {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    super(
      `You have changed your Access Token at: ${formattedDate}, consider sign In again and create a new one`
    );
  }
}

class InvalidUsernameOrPasswordAuthError extends AuthError {
  constructor() {
    super('Invalid Username or Password');
  }
}
class InvalidAccessTokenAuthError extends AuthError {
  constructor() {
    super('Invalid Access Token');
  }
}

class PermissionNotFoundAuthError extends AuthError {
  constructor(method, resource) {
    super(`You don't have permission to access ${method} /${resource} `);
  }
}

module.exports = { Auth, InvalidUsernameOrPasswordAuthError, WrongAccessTokenAuthError, AuthError };
