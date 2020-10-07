'use strict';

const models = require('./db');
const { Sequelize, sequelize } = models;

class starships extends Sequelize.Model {
  static associate(models) {
    starships.belongsToMany(models.people, {
      through: 'starship_pilots',
      as: 'people',
      foreignKey: 'id_starship',
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

        await transaction.commit();
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

  //THIS IS NOT FOR PRODUCTION JUST FOR TEST PURPOSES - SEQUELIZE BUG ON SEEDS CONSTRAINTS
  static async bugFixForSequelizeSeedErrorCosntraints() {
    setTimeout(async () => {
      let counter = 0;
      const count = await this.count();
      if (count > 15) {
        console.log('FINISH LOADING APPLICATION');
        counter = 10;
        return;
      }

      while (counter < 10) {
        try {
          await this.createOne({
            passengers: 600,
            model: 'CR90 corvette',
            manufacturer: 'Gallofree Yards, Inc.',
            name: 'CR90 corvette',
            pilotsIds: [1, 2, 3],
          });
        } catch (error) {}

        counter += 1;
      }
      console.log('FINISH LOADING APPLICATION');
    }, 1000 * 50);
    return;
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
    timestamps: true,
  }
);

module.exports = starships;
