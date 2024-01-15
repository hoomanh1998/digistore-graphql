"use strict";

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      OrderId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order);
  };
  return OrderItem;
};
