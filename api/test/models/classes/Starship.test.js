const {
  Starship,
  StarShipAlreadyExistsError,
  StarshipPilotsNotExistsError,
  StarshipInvalidBodyError,
} = require('../../../models/classes/Starship');

const { People } = require('../../../models/classes/People');

const truncate = require('../../util/truncate');

describe('Starship', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should create a new starship', async () => {
    const newStarship = {
      name: 'navigator1',
      model: 's9',
      manufacturer: 'nokia',
      passengers: '1',
    };

    const createdStarship = await Starship.createOne(newStarship);
    expect(createdStarship.id).toBeGreaterThanOrEqual(0);
  });

  it('should create a new starship with pilots', async () => {
    const pilot = await People.createOne({
      name: 'piloto_test',
      mass: '77',
      height: '171',
      skin_color: 'gold',
      gender: 'male',
    });

    const newStarship = {
      name: 'navigator2',
      model: 's9',
      manufacturer: 'nokia',
      passengers: '1',
      pilotsIds: [pilot.id],
    };

    const createdStarship = await Starship.createOne(newStarship);
    expect(createdStarship.id).toBeGreaterThanOrEqual(0);
  });

  it('should not create a starship because its already exists', async () => {
    try {
      const repeatedStarship = {
        name: 'navigator20',
        model: 's9',
        manufacturer: 'nokia',
        passengers: '1',
      };

      await Starship.createOne(repeatedStarship);
    } catch (error) {
      expect(error).toBeInstanceOf(StarShipAlreadyExistsError);
    }
  });

  it('should not create a starship because it have invalid pilots`', async () => {
    try {
      const starshipWithWrongPilots = {
        name: 'navigator21',
        model: 's9',
        manufacturer: 'nokia',
        passengers: '1',
        pilotsIds: [222],
      };

      await Starship.createOne(starshipWithWrongPilots);
    } catch (error) {
      expect(error).toBeInstanceOf(StarshipPilotsNotExistsError);
    }
  });

  it('should not create a starship because it have invalid pilots id param type`', async () => {
    try {
      const starshipWithWrongPilots = {
        name: 'navigator21',
        model: 's9',
        manufacturer: 'nokia',
        passengers: '1',
        pilotsIds: [-222],
      };

      await Starship.createOne(starshipWithWrongPilots);
    } catch (error) {
      expect(error).toBeInstanceOf(StarshipInvalidBodyError);
    }
  });
});
