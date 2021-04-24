// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   "splitwisedb",
//   "root",
//   "",
//   {
//     host: "ec2-52-15-69-100.us-east-2.compute.amazonaws.com",
//     port: 3306,
//     dialect: "mysql",
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

module.exports = {
  HOST: "splitwise.c3fgcmxhqen1.us-east-2.rds.amazonaws.com",
  PORT: 8000,
  USER: "root",
  PASSWORD: "root1234",
  DB: "splitwise",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};