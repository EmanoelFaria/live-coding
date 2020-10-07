'use strict';

const models = require('./db');
const { Sequelize, sequelize } = models;

class User extends Sequelize.Model {
  static associate(models) {
    User.hasMany(models.Permission, { foreignKey: 'userId', as: 'permissions' });
  }

  static async updatePermissions(userId, updatedUser) {
    const transaction = await sequelize.transaction();

    try {
      //TODO: make diff instead of delete all and create all, this can be separated in two separated queries
      // trigged from front-end
      await models.Permission.deleteMultiPermissions(userId, transaction);
      await models.Permission.createMultiPermissions(updatedUser.permissions, userId, transaction);
      await transaction.commit();
    } catch (error) {
      console.log(error);
      transaction.rollback();
    }
  }

  static createOne(newUser) {
    return new Promise(async (resolve, reject) => {
      const transaction = await sequelize.transaction();
      try {
        const createdUser = await this.create(newUser, { transaction });

        if (newUser.permissions) {
          await models.Permission.createMultiPermissions(
            newUser.permissions,
            createdUser.id,
            transaction
          );
        }

        await transaction.commit();
        resolve(createdUser);
      } catch (error) {
        transaction.rollback();
        reject(error);
      }
    });
  }

  static find(filter) {
    return this.findOne({
      where: filter,
      include: [
        {
          model: models.Permission,
          as: 'permissions',
          attributes: ['resource', 'method'],
        },
      ],
    });
  }

  static updateByFilter(data, filter) {
    return this.update(data, { where: filter });
  }
}
User.init(
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    accessToken: Sequelize.STRING,
  },
  {
    sequelize,
  }
);

module.exports = User;
