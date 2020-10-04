'use strict';

const models = require('./db');
const { Sequelize, sequelize } = models;

class starship_pilots extends Sequelize.Model {
  static associate(models) {
    starship_pilots.belongsTo(models.people, {
      as: 'people',
      foreignKey: 'id_people',
    });
    starship_pilots.belongsTo(models.starships, {
      as: 'starships',
      foreignKey: 'id_starship',
    });
  }

  static async createMultiPilots(starshipId, pilotsIds, transaction) {
    const newPilots = pilotsIds.map((id) => ({ id_starship: starshipId, id_people: id }));
    return await this.bulkCreate(newPilots, { transaction });
  }
}

starship_pilots.init(
  {
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
  },
  {
    sequelize,
    modelName: 'starship_pilots',
    timestamps: true,
  }
);

module.exports = starship_pilots;
