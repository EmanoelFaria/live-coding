const interfaces = require('../interfaces');
const { People } = require('./People');

class Pilot extends People {
  static async notExists(pilotsIds) {
    const existingPilots = await this.getAllByIds(pilotsIds);
    const existingPilotsIds = existingPilots.map((p) => p.id);
    const pilotsNotExists = pilotsIds.filter((x) => !existingPilotsIds.includes(x));
    return pilotsNotExists;
  }
}

module.exports = Pilot;
