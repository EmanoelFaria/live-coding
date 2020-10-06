const {
  Auth,
  InvalidUsernameOrPasswordAuthError,
  WrongAccessTokenAuthError,
  AuthError,
} = require('../models/classes/Auth');
const { User, NotFoundUserError, UserError } = require('../models/classes/User');
const UserModel = new User();

class AuthController {
  static async validate(req, res) {
    const { accessToken, method, resource } = req.body;

    try {
      await Auth.validateAccessToken(accessToken, method, resource);
      res.responser(200, `/${method} ${resource} Authorized`, {});
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
    try {
      const signUpUser = await Auth.signUp(req.body);
      res.responser(200, `New user successfully created`, signUpUser);
    } catch (error) {
      res.responser(
        AuthController._getErrorCode(error),
        AuthController._getErrorMessage(error),
        {},
        error
      );
    }
  }

  static async signIn(req, res) {
    try {
      const signUpUser = await Auth.signIn(req.body);
      res.responser(200, `New user successfully created`, signUpUser);
    } catch (error) {
      res.responser(
        AuthController._getErrorCode(error),
        AuthController._getErrorMessage(error),
        {},
        error
      );
    }
  }

  static async updateUserPermissions(req, res) {
    try {
      const updatedUser = await Auth.updatePermissions(req.params.id, req.body);
      const { username, permissions } = updatedUser;
      res.responser(200, `User successfully updated`, { username, permissions });
    } catch (error) {
      res.responser(
        AuthController._getErrorCode(error),
        AuthController._getErrorMessage(error),
        {},
        error
      );
    }
  }

  static _getErrorCode(error) {
    if (error instanceof InvalidUsernameOrPasswordAuthError) return 500;
    if (error instanceof WrongAccessTokenAuthError) return 500;
    if (error instanceof NotFoundUserError) return 500;
    return 500;
  }

  static _getErrorMessage(error) {
    if (error instanceof AuthError) return error.message;
    if (error instanceof UserError) return error.message;
    return 'something went wrong';
  }
}

module.exports = AuthController;
