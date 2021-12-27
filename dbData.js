const mysql = require('mysql');
const chalk = require("chalk");
const dbConfig = require('./config/connection.js')
const connection = dbConfig.connection
const log = console.log;

// grab database name from employee_db
const DB_NAME = process.env.DB_NAME;
// create departartment tables within employee_db
const departmentTables = "CREATE TABLE IF NOT EXISTS department (id INTEGER AUTO_INCREMENT PRIMARY KEY, department_name VARCHAR(50) NOT NULL)";
// create role tables within employee_db
const roleTables = "CREATE TABLE IF NOT EXISTS role (id INTEGER AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30) NOT NULL, salary DECIMAL NOT NULL, department_id INTEGER, CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL)";
// create employee tables within employee_db
const employeeTables = "CREATE TABLE employee (id INTEGER AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INTEGER, manager_id INTEGER, CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL, CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL)";


const dbData = () => {

    log(chalk.whiteBright.bold(`|${DB_NAME} database connected|`));
    log(chalk.whiteBright.bold(`|Checking if ${DB_NAME} exist|`));

    connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`),
      log(chalk.whiteBright.bold(`|Dropping ${DB_NAME} database if exists|`));

    connection.query(`CREATE DATABASE ${DB_NAME};`),
      log(chalk.whiteBright.bold(`|Creating ${DB_NAME} database|`));

    connection.query(`USE ${DB_NAME}`)
    connection.query(departmentTables),
      log(chalk.whiteBright.bold('|Creating department tables|'));

    connection.query(roleTables),
      log(chalk.whiteBright.bold('|Creating role tables|'));

    connection.query(employeeTables),
      log(chalk.whiteBright.bold('|Creating employee tables|'));
      log(chalk.whiteBright.bold(`|${DB_NAME} database tables and values created successfully|`));
      log(chalk.whiteBright.bold(`|${DB_NAME} database is now ready for seeding|`));
      process.exit(0);
      }
  
module.exports = dbData;
