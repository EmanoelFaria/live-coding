const User = require('../models/classes/User');

class UserController {
  static async getAll() {
    return await User.get();
  }

  static async createUser(newUser) {
    return await User.save(newUser);
  }
}

module.exports = UserController;
