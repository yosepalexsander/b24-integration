"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Profile.init(
    {
      person_id: DataTypes.INTEGER,
      hobby: DataTypes.STRING,
      status: DataTypes.STRING,
      address: DataTypes.STRING,
      user_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
    }
  );
  return Profile;
};
