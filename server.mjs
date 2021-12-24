
import chalk from 'chalk';
import seedData from './seedData.cjs';
import dbData from './dbData.cjs';
import useApp from './inqQuestions/questions.cjs';
import sequelize from './config/connection.cjs';
import inquirer from 'inquirer';
import figlet from 'figlet';
import cTable from 'console.table';
const log = console.log;
const choice1 = chalk.whiteBright.bold("Create employee_db database");
const choice2 = chalk.whiteBright.bold("Populate seed data");
const choice3 = chalk.whiteBright.bold("Use employee_db");
const choice4 = chalk.whiteBright.bold("Exit");



const goDB = async () => {
   log(chalk.bgWhiteBright.bold(`====================================================================================`));
   log(``);
   log(chalk.whiteBright.bold(figlet.textSync('Employee Tracker')));
   log(``);
   log(`                                                          ` + chalk.whiteBright.bold('By: Brian Turner'));
   log(``);
   log(chalk.bgWhiteBright.bold(`====================================================================================`));


  await inquirer.prompt ([
      {
          type:"list",
          name: "goDB",
          message: chalk.whiteBright.bold("Welcome to our Employee Tracker application.  Please select from the following to begin:"),
          choices: [{ name: choice1, value: 0 }, { name: choice2, value: 1 }, { name: choice3, value: 2}, { name: choice4, value: 3}]
      }
    
            ])
    .then((response) => {
      if (response.goDB === 0) {
        console.clear();
        dbData();
     }
     else if (response.goDB === 1) {
        console.clear();
        seedData();
     }
     else if (response.goDB === 2) {
        console.clear();
        useApp();
     }
     else {
        console.clear();
        log("Thank you for using our Professional Employee Tracker");
        log("Goodbye!");
     }
})    
};
        
goDB();

export default goDB;

// const seqStart = () => {
//   sequelize.authenticate({ force: true }).then(()  => {
//     try {
//       log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//     })

// }





// Sequelize.connect(PORT, async () => {
// questions();
// })

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => log('Now listening'));
// });
// app.listen(PORT, async () => 
// await sequelize.sync({ force: false }),
// log('Database connected!'),

//   log(`Server listening on http://localhost:${PORT} 🚀`)

// );


