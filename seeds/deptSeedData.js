// const {Departments} = require('../models');

const departmentData = [
    {
        "department_name": "Customer Service"
    },
    {
        "department_name": "Developement"
    },
    {
        "department_name": "Sales"
    },
    {
        "department_name": "Training"
    }
  ]
  const deptSeedData = () => Departments.bulkCreate(departmentData);
  
  export default deptSeedData;