const interfaces = require('../interfaces');
const peopleSchema = require('../validations/People');

class People {
  static async getOne(peopleId) {
    //TODO: add validation to check peopleId is a number/integer
    return await interfaces.people.getOne(peopleId);
  }

  static async createOne(newPeople) {
    await peopleSchema.validate(newPeople).catch((err) => {
      throw new PeopleInvalidBodyError(err.message);
    });

    return await interfaces.people.create(newPeople);
  }

  static async getAllByIds(peopleIds) {
    //TODO: adicionar validação de todos os ids do array serem numbers/integer
    return await interfaces.people.getAllByIds(peopleIds);
  }
}

class PeopleInvalidBodyError extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = { People, PeopleInvalidBodyError };
