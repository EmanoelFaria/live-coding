'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('starship_pilots', [
      {
        id: 1,
        id_starship: 1,
        id_people: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        id_starship: 2,
        id_people: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        id_starship: 1,
        id_people: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        id_starship: 1,
        id_people: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        id_starship: 3,
        id_people: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        id_starship: 2,
        id_people: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        id_starship: 4,
        id_people: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        id_starship: 1,
        id_people: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        id_starship: 3,
        id_people: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        id_starship: 5,
        id_people: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        id_starship: 1,
        id_people: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        id_starship: 1,
        id_people: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        id_starship: 3,
        id_people: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        id_starship: 3,
        id_people: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        id_starship: 1,
        id_people: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        id_starship: 3,
        id_people: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('starship_pilots', null, {});
  },
};
