const { Starship } = require('../models/classes/Starship');
const {
  StarShipAlreadyExistsError,
  StarshipPilotsNotExistsError,
  StarshipError,
} = require('../models/classes/Starship');

class StarshipController {
  static async getAll(req, res) {
    try {
      const allStarships = await Starship.getAll();
      res.send(allStarships).status(200);
    } catch (error) {
      res.responser(
        StarshipController._getErrorCode(error),
        StarshipController._getErrorMessage(error),
        {},
        error
      );
    }
  }

  static async createOne(req, res) {
    try {
      const createdStarship = await Starship.createOne(req.body);
      const createdStarshipWithPilots = await Starship.getOne(createdStarship.id);
      res.responser(200, 'Starship successfully created', createdStarshipWithPilots);
    } catch (error) {
      res.responser(
        StarshipController._getErrorCode(error),
        StarshipController._getErrorMessage(error),
        {},
        error
      );
    }
  }

  static _getErrorCode(error) {
    if (error instanceof StarShipAlreadyExistsError) return 409;
    if (error instanceof StarshipPilotsNotExistsError) return 422;
    return 500;
  }

  static _getErrorMessage(error) {
    if (error instanceof StarshipError) return error.message;
    return 'something went wrong';
  }
}

module.exports = StarshipController;
