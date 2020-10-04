//TODO: add structure to get default interface from config files
module.exports = require(`./${process.env.DB_DIALECT}`);
