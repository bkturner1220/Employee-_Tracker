const mysql = require('mysql2');
require('dotenv').config();
const log = console.log;

config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
  // database: process.env.DB_NAME,
}

let connection = mysql.createConnection(config); //added the line
connection.connect(function(err){
  if (err){
    log('error connecting:' + err.stack);
  }
  // log('connected successfully to DB.');
});

module.exports = {
     connection : mysql.createConnection(config) 
} 
