'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('starship_pilots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_people: {
        type: Sequelize.INTEGER,
        references: {
          model: 'people',
          key: 'id',
        },
      },
      id_starship: {
        type: Sequelize.INTEGER,
        references: {
          model: 'starships',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('starship_pilots');
  },
};
