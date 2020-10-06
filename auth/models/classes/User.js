class User {
  constructor(interfaceFactory = null) {
    if (interfaceFactory) this.model = interfaceFactory;
    else this.model = require(`../interfaces`)['User'];
  }

  createOne(newUser) {
    return this.model.createOne(newUser);
  }

  getOneByClientId(clientId) {
    return this.model.find({ clientId });
  }

  updateByClientId(clientId, data) {
    return this.model.updateByFilter(data, { clientId });
  }
}

module.exports = User;
