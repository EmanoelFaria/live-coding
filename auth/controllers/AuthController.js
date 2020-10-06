const { Auth, InvalidAccessToken, WrongAccessToken, AuthError } = require('../models/classes/Auth');
const UserClass = require('../models/classes/User');
const User = new UserClass(null);

class AuthController {
  static async validate(req, res) {
    const { accessToken, method, resource } = req.body;

    try {
      await Auth.validateAccessToken(accessToken, method, resource);
      res.responser(200, 'Authorized', {});
    } catch (error) {
      res.responser(
        AuthController._getErrorCode(error),
        AuthController._getErrorMessage(error),
        {},
        error
      );
    }
  }

  static async signUp(req, res) {
    const { clientId } = req.body;
    const privateUserToken = await Auth.generateSalt();
    const encryptedUserToken = await Auth.encrypt(privateUserToken);

    const accessTokenData = { clientId, permissions };

    const accessToken = await Auth.generateAccessToken(accessTokenData);

    try {
      await User.createOne({ clientId, token: encryptedUserToken, accessToken });
      res.send({ clientId, token: privateUserToken });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }

  static async signIn(req, res) {
    const { clientId, token } = req.body;
    const user = await User.getOneByClientId(clientId);
    const isValidToken = await Auth.compare(token, user.token);

    if (!isValidToken) return res.status(401).send('Invalid token');

    const accessTokenData = {
      clientId: user.clientId,
      permissions: user.permissions,
    };

    const accessToken = await Auth.generateAccessToken(accessTokenData);
    await Auth.invalidateAccessToken(user.clientId, accessToken);

    return res.send({ accessToken }).status(200);
  }

  static _getErrorCode(error) {
    if (error instanceof InvalidAccessToken) return 500;
    if (error instanceof WrongAccessToken) return 500;
    return 500;
  }

  static _getErrorMessage(error) {
    if (error instanceof AuthError) return error.message;
    return 'something went wrong';
  }
}

module.exports = AuthController;
