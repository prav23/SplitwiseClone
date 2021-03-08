const { Sequelize } = require(".");
const group = require("./group");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define("UserGroup", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    //     references: {
    //         model: user,
    //         key: 'user_id'
    //   }
    },
    group_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: group,
        //     key: 'group_id'
        // }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: true,
  });
  UserGroup.associate = function (models) {
    // associations can be defined here
  };
  return UserGroup;
};
