"use strict";

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      UserId: DataTypes.INTEGER,
      city: DataTypes.STRING,
      address: DataTypes.TEXT,
      totalItems: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {}
  );
  Order.associate = function (models) {
    Order.hasMany(models.OrderItem);
  };
  return Order;
};
