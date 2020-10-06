'use strict';
const { Sequelize, sequelize } = require('./db');

class Permission extends Sequelize.Model {
  static associate(models) {}
  static createOne(newPermission) {
    return this.create(newPermission);
  }
}
Permission.init(
  {
    resource: Sequelize.STRING,
    method: Sequelize.STRING,
    userId: Sequelize.INTEGER,
  },
  {
    sequelize,
  }
);

module.exports = Permission;
