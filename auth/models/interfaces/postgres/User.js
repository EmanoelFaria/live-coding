'use strict';

const models = require('./db');
const { Sequelize, sequelize } = models;

class User extends Sequelize.Model {
  static associate(models) {
    User.hasMany(models.Permission, { foreignKey: 'userId', as: 'permissions' });
  }
  static createOne(newUser) {
    return this.create(newUser);
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
    clientId: Sequelize.STRING,
    ip: Sequelize.STRING,
    token: Sequelize.STRING,
    accessToken: Sequelize.STRING,
  },
  {
    sequelize,
  }
);

module.exports = User;
