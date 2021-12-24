// const {Employees} = require('../models');

const employeeData = [
    {
      "first_name": "Roger",
      "last_name": "Stone",
      "role_id": "1",
      "manager_id": "1",
    },
    {
        "first_name": "John",
        "last_name": "Mildrad",
        "role_id": "2",
        "manager_id": "2",
    },
    {
        "first_name": "Walker",
        "last_name": "Mane",
        "role_id": "3",
        "manager_id": "2",
    },
    {
        "first_name": "William",
        "last_name": "Wallace",
        "role_id": "4",
        "manager_id": "1",
    },
    {
        "first_name": "Nolan",
        "last_name": "Ryan",
        "role_id": "5",
        "manager_id": "1",
    },
    {
        "first_name": "Alice",
        "last_name": "Wonderland",
        "role_id": "6",
        "manager_id": "1",
    },
    {
        "first_name": "Johnny",
        "last_name": "Smith",
        "role_id": "7",
        "manager_id": "1",
    },
    {
        "first_name": "Emanual",
        "last_name": "Rodrigiuez",
        "role_id": "8",
        "manager_id": "4",
    },
    {
        "first_name": "Rebecca",
        "last_name": "Johnson",
        "role_id": "9",
        "manager_id": "3",
    },
    {
        "first_name": "Jamie",
        "last_name": "Sanders",
        "role_id": "10",
        "manager_id": "1",

    },
  ];

  const empSeedData = () => Employees.bulkCreate(employeeData);
  
  export default empSeedData;
