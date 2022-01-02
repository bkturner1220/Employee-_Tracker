const inquirer = require(`inquirer`);
const dbConfig = require(`../config/connection.js`)
const connection = dbConfig.connection
const chalk = require(`chalk`);
const cTable = console.table
const log = console.log;
require(`dotenv`).config();

// grab database name from employee_db
const DB_NAME = process.env.DB_NAME;


// **************************  MAIN MENU SECTION BEGIN ********************************

const startApp = () => {
  const choice0 = chalk.redBright.bold(`Departments`);
  const choice1 = chalk.blueBright.bold(`Managers`);
  const choice2 = chalk.yellowBright.bold(`Employees`);
  const choice3 = chalk.greenBright.bold(`Roles`);
  const choice4 = chalk.whiteBright.bold(`Exit`);
    connection.query(`USE ${DB_NAME}`)
     inquirer.prompt ([
        {
            type:`list`,
            name: `viewDB`,
            message: chalk.whiteBright.bold(`[MAIN MENU] - Please make your selection:`),
            choices: [{ name: choice0, value: 0 }, { name: choice1, value: 1 }, { name: choice2, value: 2}, { name: choice3, value: 3}, { name: choice4, value: 4}]
        }  
              ])
      .then((response) => {
        if (response.viewDB === 0) {
            startDept();

       }
       else if (response.viewDB === 1) {
            startMgr();
       }
       else if (response.viewDB === 2) {
            startEmployee();    
       }   
       else if (response.viewDB === 3) {
        startRole();
       } else {
          console.clear();
            log(chalk.whiteBright.bold(`Thank you for using our Professional Employee Tracker`));
            log(chalk.whiteBright.bold(`Goodbye!`));
              process.exit(0);
       }
  })
}  
    
// **************************  MAIN MENU SECTION END ********************************


// **************************  DEPARTMENT SECTION BEGIN ********************************

const startDept = () => {
  const choice0 = chalk.redBright.bold(`View Departments`);
  const choice1 = chalk.redBright.bold(`Add Department`);
  const choice2 = chalk.redBright.bold(`Delete Department`);
  const choice3 = chalk.redBright.bold(`Main Menu`);
  connection.query(`USE ${DB_NAME}`)
   inquirer.prompt ([
      {
          type:`list`,
          name: `viewDept`,
          message: chalk.redBright.bold(`[DEPARTMENTS] - Please make your selection:`),
          choices: [{ name: choice0, value: 0 }, { name: choice1, value: 1 }, { name: choice2, value: 2}, { name: choice3, value: 3}]
      }  
            ])
    .then((response) => {
      if (response.viewDept === 0) {
          viewDepartments();

     }
     else if (response.viewDept === 1) {
          addDepartment();
     } 
     else if (response.viewDept === 2) {
          deleteDepartment();

     } else {
          startApp();
     }
})
} 

 viewDepartments = () => {
  const request = `SELECT * FROM department`;
  connection.query(request, (err, res) => {
    if (err) throw err;
      log(chalk.redBright.bold(`Viewing all departments`));
        cTable(res);
          startDept();
  })
  }

 addDepartment = () => {
  inquirer.prompt([{
    type: `input`,
    name: `department_name`,
    message: `Name the department you would like to add?`,
    validate: department_name => {
        if (department_name) {
            return true;
        } else {
            log(`Please enter the name of your department!`);
            return false;
        }
    }
}
])
    .then(department_name => {
        connection.promise().query("INSERT INTO department SET ?", department_name);
        viewDepartments();
    })
}

 deleteDepartment = () => {
  const deletedDepartment = chalk.redBright.bold(`Please select department you wish to delete:`);

  connection.query(`SELECT * FROM department`, (err, department) => {
  if (err) log(chalk.whiteBright.bold(err));
  department = department.map((department) => {
      return {
          name: `${department.department_name}`,
          value: department.id,
      };
  });
  inquirer
      .prompt([
          {
              type: `list`,
              name: `deleteDepartment`,
              message: deletedDepartment,
              choices: department,
          },
      ])
      .then((data) => {
          connection.query(`DELETE FROM department WHERE department.id = (${data.deleteDepartment})`,
               (err) => {
                  if (err) throw err;
              }
          );
          log(chalk.redBright.bold(`Department deleted!`));
          viewDepartments();
      });

});
};

  // **************************  DEPARTMENT SECTION END ********************************


  // **************************  MANAGERS SECTION BEGIN ********************************


const startMgr = () => {
  const choice0 = chalk.blueBright.bold(`View Managers`);
  const choice1 = chalk.blueBright.bold(`Main Menu`);
    connection.query(`USE ${DB_NAME}`)
     inquirer.prompt ([
        {
            type:`list`,
            name: `viewMgr`,
            message: chalk.blueBright.bold(`[MANAGERS] - Please make your selection:`),
            choices: [{ name: choice0, value: 0 }, { name: choice1, value: 1 }]
        }  
              ])
      .then((response) => {
        if (response.viewMgr === 0) {
            viewManagers();
  
       } else {
            startApp();
       }
  })
}
  
  viewManagers = () => {
    let request = `SELECT first_name, last_name, IFNULL(manager_id, "N/A") AS Managers FROM employee WHERE manager_id is NOT NULL`;

    connection.query(request, (err, res) => {
        if (err) throw err;
          log(chalk.blueBright.bold(`Viewing all managers`));
          cTable(res);
            startMgr();
    })
  }
  
// **************************  MANAGERS SECTION END ********************************
  

// **************************  EMPLOYEES SECTION BEGIN ********************************

const startEmployee = () => {

  const choice0 = chalk.yellowBright.bold(`View Employees`);
  const choice1 = chalk.yellowBright.bold(`Add Employee`);
  const choice2 = chalk.yellowBright.bold(`Update Employee`);
  const choice3 = chalk.yellowBright.bold(`Delete Employee`);
  const choice4 = chalk.yellowBright.bold(`Main Menu`);
    connection.query(`USE ${DB_NAME}`)
     inquirer.prompt ([
        {
            type:`list`,
            name: `viewEmp`,
            message: chalk.yellowBright.bold(`[EMPLOYEES] - Please make your selection:`),
            choices: [{ name: choice0, value: 0 }, { name: choice1, value: 1 }, { name: choice2, value: 2}, { name: choice3, value: 3}, { name: choice4, value: 4}]
        }  
              ])
      .then((response) => {
        if (response.viewEmp === 0) {
            viewEmployees();
  
       }
       else if (response.viewEmp === 1) {
            addEmployee();
       }
       else if (response.viewEmp === 2) {
            updateEmployee();
        
       }   
       else if (response.viewEmp === 3) {
            deleteEmployee();
  
       } else {
            startApp();
       }
  })
  }
  
  viewEmployees = () => {
    // const request = `SELECT employee.first_name, employee.last_name, role.title FROM employee,  role WHERE employee.id = role.id`;
    // const request = `SELECT employee.first_name, employee.last_name, IFNULL(manager_id, "N/A") AS Managers, role.salary, role.title FROM employee,  role WHERE employee.id = role.id`
   const request =  `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(request, (err, res) => {
      if (err) throw err;
        log(chalk.yellowBright.bold(`Viewing all employees`));
          cTable(res);
            startEmployee();
    })
    }
  
   addEmployee = () => {
    const fn = chalk.yellowBright.bold(`Enter first name of new employee`);
    const ln = chalk.yellowBright.bold(`Enter last name of new employee`);
    const role = chalk.yellowBright.bold(`Enter new employee role`);
    const mgrID = chalk.yellowBright.bold(`Please enter a manager ID (0 = no manager ID required)`);

    connection.query(`SELECT * FROM role;`, (err, roles) => {
      if (err) log(chalk.whiteBright.bold(err));
      roles = roles.map((role) => {
          return {
              name: role.title,
              value: role.id,
          };
      });
      inquirer
          .prompt([
              {
                  type: `input`,
                  name: `firstName`,
                  message: fn
              },
              {
                  type: `input`,
                  name: `lastName`,
                  message: ln
              },
              {
                  type: `list`,
                  name: `role`,
                  message: role,
                  choices: roles,
              },
              {
                  type: `input`,
                  name: `managerId`,
                  message: mgrID,
                  choices: [1,2,3,4,5,6,7,8,9]
              }
          ])
          .then((data) => {
              log(chalk.whiteBright.bold(data.role));
              connection.query(
                  `INSERT INTO employee SET ?;`,
                  {
                      first_name: data.firstName,
                      last_name: data.lastName,
                      role_id: data.role,
                      manager_id: data.managerId
                  },
                  (err) => {
                      if (err) throw err;
                      log(chalk.yellowBright.bold(`Employee updated!;`));
                      viewEmployees();

                  }
              );
          });
  });

};

  
   updateEmployee = () => {
    const se = chalk.yellowBright.bold(`Select employee to update`);
    const nr = chalk.yellowBright.bold(`Select employees new role`);

    connection.query(`SELECT * FROM employee`, (err, employees) => {
      if (err) log(chalk.whiteBright.bold(err));
      employees = employees.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
          };
      });
      connection.query(`SELECT * FROM role`, (err, roles) => {
          if (err) log(chalk.whiteBright.bold(err));
          roles = roles.map((role) => {
              return {
                  name: role.title,
                  value: role.id,
              }
          });
          inquirer
              .prompt([
                  {
                      type: `list`,
                      name: `chooseEmp`,
                      message: se,
                      choices: employees,
                  },
                  {
                    type: `list`,
                    name: `newRole`,
                    message: nr,
                    choices: roles,     
                  },
              ])
              .then((data) => {
                connection.query('UPDATE employee SET ? WHERE ?',
                    [
                        {
                            role_id: data.newRole,
                        },
                        {
                            id: data.chooseEmp,
                        },
                    ],
                     (err) => {
                        if (err) throw err;
                    }
                );
                        log(chalk.yellowBright.bold(`Employee update successful!`));
                  viewEmployees();
              });

      });
  });
};

  
  
   deleteEmployee = () => {
    const deletedEmployee = chalk.yellowBright.bold(`Please select employee you wish to delete:`);

        connection.query(`SELECT * FROM employee`, (err, employee) => {
        if (err) log(chalk.whiteBright.bold(err));
        employee = employee.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: `list`,
                    name: `deleteEmployee`,
                    message: deletedEmployee,
                    choices: employee,
                },
            ])
            .then((data) => {
                connection.query(`DELETE FROM employee WHERE employee.id = (${data.deleteEmployee})`,
                     (err) => {
                        if (err) throw err;
                    }
                );
                log(chalk.yellowBright.bold(`Employee Deleted!`));
                viewEmployees();
            });

    });
    };
  
    // **************************  EMPLOYEES SECTION END ********************************


    // **************************  ROLES SECTION BEGIN ********************************


const startRole = () => {
  const choice0 = chalk.greenBright.bold(`View Roles`);
  const choice1 = chalk.greenBright.bold(`Add Role`);
  const choice2 = chalk.greenBright.bold(`Delete Role`);
  const choice3 = chalk.greenBright.bold(`Main Menu`);
    connection.query(`USE ${DB_NAME}`)
     inquirer.prompt ([
        {
            type:`list`,
            name: `viewRole`,
            message: chalk.greenBright.bold(`[ROLES] - Please make your selection:`),
            choices: [{ name: choice0, value: 0 }, { name: choice1, value: 1 }, { name: choice2, value: 2}, { name: choice3, value: 3}]
        }  
              ])
      .then((response) => {
        if (response.viewRole === 0) {
            viewRoles();
  
       }
       else if (response.viewRole === 1) {
            addRole();
       }
       else if (response.viewRole === 2) {
            deleteRole();
  
       } else {
            startApp();
       }
  })
  }
  
   viewRoles = () => {
    let request = `SELECT role.id, role.title, department.department_name AS department FROM role INNER JOIN department ON role.department_id = department.id`;
    connection.query(request, (err, res) => {
        if (err) throw err;
          log(chalk.greenBright.bold(`Viewing all roles`));
            cTable(res);
              startRole();
})
}
  
   addRole = () => {
    connection.query(`SELECT * FROM department`, (err, departments) => {
      if (err) log(err);
      departments = departments.map((department) => {
        return {
          name: `${department.department_name}`,
          value: department.id,
      };
      });
      inquirer
          .prompt([
              {
                  type: `input`,
                  name: `newRole`,
                  message: `Enter title of new role`
              },
              {
                  type: `input`,
                  name: `salary`,
                  message: `Enter salary of new role`,
              },
              {
                  type: `list`,
                  name: `departmentId`,
                  message: `Enter department of new role`,
                  choices: departments,
              },
          ])
          .then((data) => {
              connection.query(
                  `INSERT INTO role SET ?`,
                  {
                      title: data.newRole,
                      salary: data.salary,
                      department_id: data.departmentId,
                  },
                   (err) => {
                      if (err) throw err;
                  }
              );
              log(`added new employee role!`)
              viewRoles();
          });

  });

};
  
  
  deleteRole = () => {
    const deletedRole = chalk.yellowBright.bold(`Please select role you wish to delete:`);
    connection.query(`SELECT * FROM role`, (err, role) => {
    if (err) log(chalk.whiteBright.bold(err));
    role = role.map((role) => {
        return { name: `${role.title}`, value: role.id }; });
    inquirer
        .prompt([
            {
                type: `list`,
                name: `deleteRole`,
                message: deletedRole,
                choices: role,
            },
        ])
        .then((data) => {
            connection.query(`DELETE FROM role WHERE role.id = (${data.deleteRole})`,
                 (err) => {
                    if (err) throw err;
                }
            );
            log(chalk.yellowBright.bold(`Role Deleted!`));
            viewRoles();
        });
    });
};
  
    // **************************  ROLES SECTION END ********************************
  


module.exports = startApp;
