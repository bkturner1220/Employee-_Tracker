const Sequelize = require('sequelize');
require('dotenv').config();
const log = console.log

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  },
  log('Trying database connection to employees_db...')

);

module.exports = sequelize;