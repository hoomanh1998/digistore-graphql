"use strict";

module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define(
    "WishList",
    {
      UserId: DataTypes.INTEGER,
    },
    {}
  );
  WishList.associate = function (models) {
    WishList.hasMany(models.WishListItem);
  };
  return WishList;
};
