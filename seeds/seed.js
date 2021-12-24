const sequelize = require('../config/connection');
// const server = require('../server')
// const { Departments, Roles, Employees } = require('../models');

const deptSeedData = require('./deptSeedData').default;
const empSeedData = require('./empSeedData').default;
// const start = require('../server');

let roleTitles = ['Customer Service', 'Training', 'Sales', 'Development'];
let deptIds = ['1', '2', '3', '4'];
const log = console.log

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await empSeedData();
  await deptSeedData();

    // const department = await Departments.bulkCreate(deptSeedData);



  
  // Create employees at random
  for (let i = 0; i < 10; i++) {


  //   // Get a random department's `id`
  //   const { id: randomDepartmentId } = department[
  //     Math.floor(Math.random() * department.length)
  //   ];



  // Create a new Role with random `salary` and `department_id` values, but with ids selected above
  await Roles.create({
    title: roleTitles[roleTitles.length * Math.random() | 0],
    salary: (Math.random() * 10000 + 1000).toFixed(2),
    department_id: deptIds[deptIds.length * Math.random() | 0],


  }).catch((err) => {
    // If there's an error, such as the same random pairing of `department.id` and `salary` occurring and we get a constraint error, don't quit the Node process
    log(err);
  });

//   for (let i = 0; i === 10; i++) {

//     const { id: randomManagerId } = manager[
//       Math.floor(Math.random() * manager.length)
//     ];


// // Create a new Employee with random `role_id's` and `manager_id's` values, but with ids selected above
//   await Employees.create({
//     role_id: (Math.random() * 10000 + 1000).toFixed(1),
//     manager_id: randomManagerId,
//   }).catch((err) => {
//   // If there's an error, such as the same random pairing of `role.id's` and `manager_id's` occurring and we get a constraint error, don't quit the Node process
//     log(err);
//   });
  }
  // console.clear();
log('Database created and your seeds where planted successfully!');
log('Please enter npm start to proceed...');
process.exit(0);
};

seedDatabase();

