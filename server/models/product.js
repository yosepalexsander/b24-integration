"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "user_id",
        },
      });

      Product.belongsToMany(models.Category, {
        as: "categories",
        through: {
          model: "CategoryProduct",
          as: "bridge",
        },
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
