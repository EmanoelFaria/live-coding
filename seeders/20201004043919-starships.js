'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('starships', [
      {
        passengers: 600,

        model: 'CR90 corvette',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'CR90 corvette',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,

        model: 'Imperial I-class Star Destroyer',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Star Destroyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 75,

        model: 'Sentinel-class landing craft',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Sentinel-class landing craft',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 843,

        model: 'DS-1 Orbital Battle Station',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Death Star',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 6,

        model: 'YT-1300 light freighter',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Millennium Falcon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,

        model: 'BTL Y-wing',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Y-wing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,

        model: 'T-65 X-wing',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'X-wing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 0,

        model: 'Twin Ion Engine Advanced x1',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'TIE Advanced x1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 38000,

        model: 'Executor-class star dreadnought',
        manufacturer: 'Gallofree Yards, Inc.',
        name: 'Executor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        passengers: 90,

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
