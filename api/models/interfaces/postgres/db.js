const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config/sequelize.js')[env];
const Sequelize = require('sequelize');

const db = { Sequelize };

if (config.use_env_variable) {
  db.sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  db.sequelize = new Sequelize(config.database, config.username, config.password, config);
}
module.exports = db;
