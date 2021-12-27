const mysql = require('mysql2');
require('dotenv').config();
const log = console.log;

dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

let connection = mysql.createConnection(dbConfig); //added the line

module.exports = {
     connection : mysql.createConnection(dbConfig) 
} 
