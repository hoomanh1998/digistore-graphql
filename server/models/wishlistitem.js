"use strict";

module.exports = (sequelize, DataTypes) => {
  const WishListItem = sequelize.define(
    "WishListItem",
    {
      ProductId: DataTypes.INTEGER,
      WishListId: DataTypes.INTEGER,
    },
    {}
  );
  WishListItem.associate = function (models) {
    WishListItem.belongsTo(models.WishList);
  };
  return WishListItem;
};
