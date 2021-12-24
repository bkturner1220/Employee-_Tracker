usage: npm i

// to create database from config.json info in config directory
sequelize db:create

// to create new model from sequelize cli
sequelize model:generate --name <modelName> --attributes <tableName:string, anotherTableName:Decimal(0,2)>

// drops databases every time its executed
await sequelize.sync({ force: true });

// this just alters the table and creates another instance instead of dropping all tables
await sequelize.sync({ alter: true });

