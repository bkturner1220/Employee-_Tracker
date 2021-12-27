const chalk = require('chalk');
const inquirer = require('inquirer');
const seedData = require('./seedData');
const dbData = require('./dbData');
const startApp = require('./inqQuestions/questions');
const log = console.log;



const goDB = () => {
   const choice1 = chalk.whiteBright.bold("Create employee_db database");
   const choice2 = chalk.whiteBright.bold("Populate seed data");
   const choice3 = chalk.whiteBright.bold("Use employee_db");
   const choice4 = chalk.whiteBright.bold("Exit");
      log('');
         inquirer.prompt ([
      {
          type:"list",
          name: "goDB",
          message: chalk.whiteBright.bold("Please select from the following to get started!"),
          choices: [{ name: choice1, value: 0 }, { name: choice2, value: 1 }, { name: choice3, value: 2}, { name: choice4, value: 3}]
      }
                  ])
    .then((response) => {
      if (response.goDB === 0) {
      console.clear();
        log('');
         dbData();
     }
     else if (response.goDB === 1) {
      console.clear();
        log('');
         seedData();
     }
     else if (response.goDB === 2) {
      console.clear();
        log('');
         startApp();
     }
     else {
      console.clear();
        log('');
         log(chalk.whiteBright.bold("Thank you for using our Professional Employee Tracker"));
            log(chalk.whiteBright.bold("Goodbye!"));
               process.exit(0);
     }
   })    
};
        
goDB();



