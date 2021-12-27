const inquirer = require('inquirer');
const dbConfig = require('../config/connection.js')
const connection = dbConfig.connection
const chalk = require("chalk");
const cTable = console.table
const log = console.log;
require('dotenv').config();

// grab database name from employee_db
const DB_NAME = process.env.DB_NAME;

const choice0 = chalk.redBright.bold("Departments");
const choice1 = chalk.blueBright.bold("Managers");
const choice2 = chalk.yellowBright.bold("Employees");
const choice3 = chalk.greenBright.bold("Roles");
const choice4 = chalk.whiteBright.bold("Exit");



const startApp = () => {
    connection.query(`USE ${DB_NAME}`)
     inquirer.prompt ([
        {
            type:"list",
            name: "viewDB",
            message: chalk.whiteBright.bold("Please make your selection:"),
            choices: [{ name: choice0, value: 0 }, { name: choice1, value: 1 }, { name: choice2, value: 2}, { name: choice3, value: 3}, { name: choice4, value: 4}]
        }  
              ])
      .then((response) => {
        if (response.viewDB === 0) {
            viewDepartments();

       }
       else if (response.viewDB === 1) {
            viewManagers();
       }
       else if (response.viewDB === 2) {
            viewEmployees();
        
       }   
       else if (response.viewDB === 3) {
        viewRoles();
       } else {
          console.clear();
          log(chalk.whiteBright.bold("Thank you for using our Professional Employee Tracker"));
          log(chalk.whiteBright.bold("Goodbye!"));
            process.exit(0);
       }
  })
}  
    
  
    function viewRoles() {
        let request = "SELECT * FROM role";
        connection.query(request, function(err, res) {
            if (err) throw err;
            log("Viewing All Roles");
            cTable(res);
    })
}

function viewManagers() {
    let request = "SELECT manager_id FROM employee";
    connection.query(request, function(err, res) {
        if (err) throw err;
        log("Viewing All Managers");
        cTable(res);
})
}

  function viewDepartments() {
      let sql = `SELECT * FROM department`;
    connection.query(sql, (err, rows) => 
        'SELECT * FROM department;',
        (err, results) => {
            log(results); // results contains rows returned by server
        log("Viewing All Departments");
        cTable(rows);

    })
}
    function viewEmployees() {
        const request = "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id";
        // connection.query('USE employee_db')
        connection.query(request, function(err, res) {
          if (err) throw err;
          console.log("Viewing All Employees");
          cTable(res);
        })
        }
  
module.exports = startApp;
