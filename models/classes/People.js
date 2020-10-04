const interfaces = require('../interfaces');

class People {
  static async getOne(peopleId) {
    //TODO: add validation to check peopleId is a number/integer
    return await interfaces.people.getOne(peopleId);
  }

  static async getAllByIds(peopleIds) {
    //TODO: adicionar validação de todos os ids do array serem numbers/integer
    return await interfaces.people.getAllByIds(peopleIds);
  }
}

module.exports = People;
