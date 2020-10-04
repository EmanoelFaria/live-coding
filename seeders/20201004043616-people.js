'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('people', [
      {
        gender: 'male',

        skin_color: 'fair',
        name: 'Luke Skywalker',
        height: 172,
        mass: 77,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'n/a',

        skin_color: 'gold',
        name: 'C-3PO',
        height: 167,
        mass: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'n/a',

        skin_color: 'white, blue',
        name: 'R2-D2',
        height: 96,
        mass: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'male',

        skin_color: 'white',
        name: 'Darth Vader',
        height: 202,
        mass: 136,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'female',

        skin_color: 'light',
        name: 'Leia Organa',
        height: 150,
        mass: 49,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'male',

        skin_color: 'light',
        name: 'Owen Lars',
        height: 178,
        mass: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'female',

        skin_color: 'light',
        name: 'Beru Whitesun lars',
        height: 165,
        mass: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'n/a',

        skin_color: 'white, red',
        name: 'R5-D4',
        height: 97,
        mass: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'male',

        skin_color: 'light',
        name: 'Biggs Darklighter',
        height: 183,
        mass: 84,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'male',

        skin_color: 'fair',
        name: 'Obi-Wan Kenobi',
        height: 182,
        mass: 77,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people', null, {});
  },
};
