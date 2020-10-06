'use strict';
const { Sequelize, sequelize } = require('./db');

class Permission extends Sequelize.Model {
  static associate(models) {}
  static createOne(newPermission) {
    return this.create(newPermission);
  }

  static async createMultiPermissions(permissions, userId, transaction) {
    const newPermissions = permissions.map((p) => ({
      method: p.method,
      resource: p.resource,
      userId,
    }));
    return await this.bulkCreate(newPermissions, { transaction });
  }

  static deleteMultiPermissions(userId, transaction) {
    return this.destroy({ where: { userId } }, transaction);
  }

  static async createMultiPilots(starshipId, pilotsIds, transaction) {
    const newPilots = pilotsIds.map((id) => ({ id_starship: starshipId, id_people: id }));
    return await this.bulkCreate(newPilots, { transaction });
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
