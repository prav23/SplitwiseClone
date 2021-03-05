module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    // https://sequelize.org/master/manual/model-basics.html#model-definition
    timestamps: false,
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
