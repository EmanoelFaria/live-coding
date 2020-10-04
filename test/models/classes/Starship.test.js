const {
  Starship,
  StarShipAlreadyExistsError,
  StarshipPilotsNotExistsError,
} = require('../../../models/classes/Starship');

describe('Starship', () => {
  it('should create a new starship with pilots', async () => {
    const newStarship = {
      name: 'navigator20',
      model: 's9',
      manufacturer: 'nokia',
      passengers: '1',
      pilotsIds: [1, 2, 3],
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
        pilotsIds: [1, 2, 3],
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
        pilotsIds: [1, 222, 3],
      };

      await Starship.createOne(starshipWithWrongPilots);
    } catch (error) {
      expect(error).toBeInstanceOf(StarshipPilotsNotExistsError);
    }
  });
});
