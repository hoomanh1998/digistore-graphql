"use strict";

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      CartId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {}
  );
  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Cart);
    CartItem.belongsTo(models.Product);
  };
  return CartItem;
};
