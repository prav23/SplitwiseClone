const { Sequelize } = require(".");
const group = require("./group");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
    expense_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expense_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: user,
        //     key: 'user_id'
        // }
    },
    group_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: group,
        //     key: 'group_id'
        // }
    },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: true,
  });
  Expense.associate = function (models) {
    // associations can be defined here
  };
  return Expense;
};
