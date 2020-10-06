const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const env = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: false,
};

module.exports = {
  development: env,
  production: env,
  test: env,
};
