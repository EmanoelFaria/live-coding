const models = require('../../models/interfaces');
const Sequelize = require('sequelize');

async function truncate() {
  try {
    return await Promise.all(
      Object.keys(models).map((key) => {
        if (!isModel(key)) return null;
        return models[key].destroy({ where: {}, force: true, cascate: true });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

const isModel = (key) =>
  !['sequelize', 'Sequelize', '', 'undefined'].includes(key) &&
  models[key].prototype instanceof Sequelize.Model;

module.exports = truncate;
