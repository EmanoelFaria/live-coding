const interfaces = require('../interfaces');
const Pilot = require('./Pilot');

class Starship {
  static async getAll() {
    return interfaces.starships.getAll();
  }

  static async getOne(id) {
    return await interfaces.starships.getOne(id);
  }

  static async createOne(newStarship) {
    const starShipAlreadyExists = await this.alreadyExists(newStarship);
    if (starShipAlreadyExists) throw new StarShipAlreadyExistsError();

    if (newStarship.pilotsIds) {
      const pilotsNotExists = await Pilot.notExists(newStarship.pilotsIds);
      if (pilotsNotExists.length != 0) throw new StarshipPilotsNotExistsError(pilotsNotExists);
    }

    return await interfaces.starships.createOne(newStarship);
  }

  static async alreadyExists(newStarship) {
    const { name, model, manufacturer } = newStarship;
    const starshipAttributes = { name, model, manufacturer };
    return await interfaces.starships.getOneByAttributes(starshipAttributes);
  }
}

class StarshipError extends Error {
  constructor(msg) {
    super(msg);
  }
}

class StarShipAlreadyExistsError extends StarshipError {
  constructor() {
    super('Starship already exists');
  }
}

class StarshipPilotsNotExistsError extends StarshipError {
  constructor(pilotsIds) {
    super(`Pilots with ids ${pilotsIds} not found on database`);
  }
}

module.exports = {
  Starship,
  StarShipAlreadyExistsError,
  StarshipPilotsNotExistsError,
  StarshipError,
};
