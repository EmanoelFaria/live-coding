const interfaces = require('../interfaces');
const UserValidation = require('../validations/UserValidation');

class User {
  static async get() {
    const response = await interfaces.User.getAll();
    return response;
  }

  static async save(newUser) {
    if (!UserValidation.isValid(newUser)) throw new InvalidUserFieldsError();

    const userAlreadyExists = await interfaces.User.findOne({
      where: { email: newUser.email },
    });

    if (userAlreadyExists) throw new UserAlreadyExistsError();

    return await interfaces.User.createOne(newUser);
  }

  static associate(models) {
    // define association here
  }
}

class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
  }
}

class InvalidUserFieldsError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = User;
