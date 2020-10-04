'use strict';

const models = require('./db');
const { Sequelize, sequelize } = models;

class people extends Sequelize.Model {
  static associate(models) {
    people.belongsToMany(models.starships, {
      through: 'starship_pilots',
      as: 'starships',
      foreignKey: 'id_people',
    });
  }

  static async getAll() {
    return await this.findAll({
      attributes: ['name', 'mass', 'height', 'skin_color', 'gender'],
    });
  }

  static async getAllByIds(peopleIds) {
    return await this.findAll({
      where: {
        id: { [Sequelize.Op.or]: peopleIds },
      },
    });
  }
}

people.init(
  {
    name: Sequelize.STRING,
    mass: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
    skin_color: Sequelize.STRING,
    gender: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: 'people',
    timestamps: true,
  }
);

module.exports = people;
