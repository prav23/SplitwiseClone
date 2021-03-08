const { Sequelize } = require(".");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        // alter this table later once parent tables are created
        // references: {
        //     model: user,
        //     key: 'user_id'
        // }
      },
      image: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      currency: {
        type: DataTypes.STRING,
      },
      language: {
        type: DataTypes.STRING,
      },
      timezone: {
        type: DataTypes.STRING,
      },
    },
    {
      // https://sequelize.org/master/manual/model-basics.html#model-definition
      timestamps: false,
    });
    Profile.associate = function (models) {
      // associations can be defined here
    };
    return Profile;
  };
  