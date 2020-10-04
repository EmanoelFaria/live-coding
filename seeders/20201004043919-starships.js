'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('starships', [
      {
        passengers: 600,
        id: 1,
        model: 'CR90 corvette',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'CR90 corvette',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,
        id: 2,
        model: 'Imperial I-class Star Destroyer',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Star Destroyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 75,
        id: 3,
        model: 'Sentinel-class landing craft',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Sentinel-class landing craft',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 843,
        id: 4,
        model: 'DS-1 Orbital Battle Station',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Death Star',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 6,
        id: 5,
        model: 'YT-1300 light freighter',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Millennium Falcon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,
        id: 6,
        model: 'BTL Y-wing',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Y-wing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,
        id: 7,
        model: 'T-65 X-wing',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'X-wing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,
        id: 8,
        model: 'Twin Ion Engine Advanced x1',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'TIE Advanced x1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 38000,
        id: 9,
        model: 'Executor-class star dreadnought',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Executor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 90,
        id: 10,
        model: 'GR-75 medium transport',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Rebel transport',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('starships', null, {});
  },
};
