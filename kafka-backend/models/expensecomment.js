const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const ExpenseComment = sequelize.define("ExpenseComment", {
    comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: true,
  });
  ExpenseComment.associate = function (models) {
    // associations can be defined here
  };
  return ExpenseComment;
};
