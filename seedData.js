const chalk = require("chalk");
require('dotenv').config();
const dbConfig = require('./config/connection.js')
const connection = dbConfig.connection
const log = console.log;

// grab database name from employee_db
const DB_NAME = process.env.DB_NAME;
// create departartment values within employee_db
const departmentValues = "INSERT INTO department (department_name) VALUES ('Customer Service'), ('Development'), ('SEO'), ('Sales')";
// create role values within employee_db
const roleValues = "INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 45000, 4), ('Salesperson', 38000, 1),('SEO Tech', 80000, 3), ('Lead Developer', 150000, 2), ('Customer Service Rep.', 35000, 1), ('Development Manager', 160000, 2),('SEO Tech Trainee', 55000, 3), ('SEO Lead', 14000, 4), ('Customer Service Manager', 80000, 1)";
// create employee values within employee_db
const employeeValues = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Johnny', 'Walker', 1, NULL), ('Roger', 'Stone', 2, NULL),('Ashley', 'Meldrum', 3, NULL),('Donald', 'Trump', 4, NULL),('JoAnna', 'Smith', 5, NULL),('Amber', 'Maguire', 6, 2),('Billy', 'Bob', 7, NULL),('Tom', 'Hanks', 8, 5)";


const seedData = () => {

  log(chalk.whiteBright.bold(`|Checking if ${DB_NAME} database exists|`));

    connection.query(`USE ${DB_NAME}`)
    connection.query(departmentValues),
      log(chalk.whiteBright.bold('|Seeding department data|'));
    
    connection.query(roleValues),
      log(chalk.whiteBright.bold('|Seeding role data|'));
    connection.query(employeeValues),
        log(chalk.whiteBright.bold('|Seeding employee data|'));
        log(chalk.whiteBright.bold(`|All tables and values have been entered into ${DB_NAME} successfully|`));
        process.exit(0);
    }
  
module.exports = seedData;
