const { User, WishList, WishListItem } = require("../../models");
const { checkUserToken } = require("../../util");

module.exports = {
  Mutation: {
    addToWishList: async (_, { product_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const _user = await User.findOne({ where: { id: user.id } });
          if (_user) {
            const wishList = await WishList.findOne({
              where: { UserId: user.id },
            });
            const wishListItems = await WishListItem.findAll({
              where: { WishListId: wishList.id },
            });
            const productIds = wishListItems.map((item) => item.ProductId);
            const productExist = productIds.includes(parseInt(product_id));
            if (!productExist) {
              await WishListItem.create({
                ProductId: product_id,
                WishListId: wishList.id,
              });
              return true;
            } else {
              return false;
            }
          } else {
            throw new Error("Can not add new item.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    removeFromWishList: async (_, { product_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const _user = await User.findOne({ where: { id: user.id } });
          if (_user) {
            const wishList = await WishList.findOne({
              where: { UserId: user.id },
            });
            const wishListItems = await WishListItem.findAll({
              where: { WishListId: wishList.id },
            });
            const productIds = wishListItems.map((item) => item.ProductId);
            const productExist = productIds.includes(parseInt(product_id));
            if (productExist) {
              await WishListItem.destroy({
                where: { WishListId: wishList.id, ProductId: product_id },
              });
              return {
                id: product_id,
              };
            } else {
              return false;
            }
          } else {
            throw new Error("Can not remove an item.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
