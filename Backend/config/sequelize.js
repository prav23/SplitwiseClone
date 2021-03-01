const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  "Splitwise",
  "root",
  "root",
  {
    host: "localhost",
    port: 3306,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
