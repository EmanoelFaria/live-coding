class User {
  constructor(interfaceFactory = null) {
    if (interfaceFactory) this.model = interfaceFactory;
    else this.model = require(`../interfaces`)['User'];
  }

  async createOne(newUser) {
    await this.model.createOne(newUser);
  }

  async getOneByUsername(username) {
    const requestedUser = await this.model.find({ username });
    if (requestedUser) return requestedUser;
    throw new NotFoundUserError();
  }

  async getOneById(id) {
    return this.getOneByFilter({ id });
  }

  async getOneByFilter(filter) {
    const requestedUser = await this.model.find(filter);
    if (requestedUser) return requestedUser;
    throw new NotFoundUserError();
  }

  updatePermissions(userId, updatedUser) {
    return this.model.updatePermissions(userId, updatedUser);
  }

  updateByUsername(username, data) {
    return this.model.updateByFilter(data, { username });
  }
}

class UserError extends Error {
  constructor(msg) {
    super(msg);
  }
}

class NotFoundUserError extends UserError {
  constructor(msg) {
    super('User not Found');
  }
}

module.exports = { User, NotFoundUserError, UserError };
