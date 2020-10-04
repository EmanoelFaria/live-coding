'use strict';

const models = require('./db');
const { Sequelize, sequelize } = models;

class starships extends Sequelize.Model {
  static associate(models) {
    starships.belongsToMany(models.people, {
      through: 'starship_pilots',
      as: 'people',
      foreignKey: 'id_startship',
    });
  }

  static async getAll() {
    return await this.findAll({
      attributes: ['name', 'model', 'manufacturer', 'passengers'],
      include: [
        {
          model: models.people,
          as: 'people',
          attributes: ['id', 'name', 'gender'],
          through: { attributes: [] },
        },
      ],
    });
  }

  static createOne(newStarship) {
    return new Promise(async (resolve, reject) => {
      const transaction = await sequelize.transaction();
      try {
        const createdStarship = await this.create(newStarship, { transaction });

        if (newStarship.pilotsIds) {
          await models.starship_pilots.createMultiPilots(
            createdStarship.id,
            newStarship.pilotsIds,
            transaction
          );
        }

        transaction.commit();
        resolve(createdStarship);
      } catch (error) {
        transaction.rollback();
        reject(error);
      }
    });
  }

  static async getOne(starshipId) {
    return await this.findOne({
      where: { id: starshipId },
      include: [
        {
          model: models.people,
          as: 'people',
          attributes: ['id', 'name', 'gender'],
          through: { attributes: [] },
        },
      ],
    });
  }

  static async getOneByAttributes(filters) {
    //TODO: validate filters fields, its a name/model/manufacturer/passengers etc
    return await this.findOne({ where: filters });
  }
}

starships.init(
  {
    name: Sequelize.STRING,
    model: Sequelize.STRING,
    manufacturer: Sequelize.STRING,
    passengers: Sequelize.INTEGER,
  },
  {
    sequelize,
    modelName: 'starships',
    timestamps: false,
  }
);

module.exports = starships;
