"use strict";

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      UserId: DataTypes.INTEGER,
    },
    {}
  );
  Cart.associate = function (models) {
    Cart.hasMany(models.CartItem);
  };
  return Cart;
};
