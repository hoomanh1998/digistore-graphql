"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category);
    }
  }
  Product.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      image: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
