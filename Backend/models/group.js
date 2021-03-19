const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: true,
  });
  Group.associate = function (models) {
    // associations can be defined here
  };
  return Group;
};
