const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
  "my_awesome_database",
  "koob_user",
  "koob_is_not_the_password",
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({});

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Address);
// db.Address.belongsTo(db.User);

module.exports = db;
