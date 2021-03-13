const { Sequelize } = require(".");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  const UserFriends = sequelize.define("UserFriends", {
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
    friends_owe_map: {
        type: DataTypes.JSON
    },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: true,
  });
  UserFriends.associate = function (models) {
    // associations can be defined here
  };
  return UserFriends;
};
