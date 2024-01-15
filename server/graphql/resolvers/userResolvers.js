const {
  User,
  Location,
  Product,
  WishList,
  WishListItem,
  Cart,
  CartItem,
  Order,
  OrderItem,
} = require("../../models");
const { checkUserToken, convertTimestampToDate } = require("../../util");

module.exports = {
  Query: {
    user: async (_, { user_id }, { user }) => {
      if (checkUserToken(user) && user_id === user.id) {
        try {
          const user = await User.findByPk(user_id);
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },

    users: async (_, __, { user }) => {
      try {
        checkUserToken(user);
        return User.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    currentUser: async (_, __, { user }) => {
      try {
        if (checkUserToken(user)) {
          const curentUser = await User.findByPk(user.id);
          return curentUser;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  User: {
    locations: async ({ id }) => {
      const locations = await Location.findAll({
        raw: true,
        where: { UserId: id },
        order: [["id", "ASC"]],
      });

      return locations;
    },

    wishList: async ({ id }) => {
      const wishList = await WishList.findOne({
        where: { UserId: id },
      });

      const wishListItems = await WishListItem.findAll({
        raw: true,
        where: { WishListId: wishList.id },
        order: [["id", "ASC"]],
      });

      const productIds = wishListItems.map((item) => item.ProductId);

      const products = await Promise.all(
        productIds.map(async (id) => {
          const product = await Product.findByPk(id);
          return product;
        })
      );

      return { id: wishList.id, items: products };
    },

    cart: async ({ id }) => {
      try {
        const cart = await Cart.findOne({
          raw: true,
          attributes: ["id"],
          where: { UserId: id },
        });

        const cartItems = await CartItem.findAll({
          raw: true,
          where: { CartId: cart.id },
          include: [
            {
              model: Product,
              attributes: ["price"],
              required: true,
            },
          ],
          order: [["id", "ASC"]],
        });

        if (cartItems && cartItems.length > 0) {
          const totalItems = cartItems.reduce(
            (acc, currItem) => acc + currItem.quantity,
            0
          );

          const totalPrice = cartItems.reduce(
            (acc, currItem) =>
              acc + currItem["Product.price"] * currItem.quantity,
            0
          );

          const transformedCartItems = await Promise.all(
            cartItems.map(async (item) => {
              const product = await Product.findByPk(item.ProductId);
              return { id: item.id, product, quantity: item.quantity };
            })
          );

          return {
            id: cart.id,
            items: transformedCartItems,
            totalItems,
            totalPrice,
          };
        }

        return { id: cart.id, items: [], totalItems: 0, totalPrice: 0 };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    orders: async ({ id }) => {
      const orders = await Order.findAll({
        where: { UserId: id },
      });

      const allOrder = [];

      for (let order of orders) {
        const orderItems = await OrderItem.findAll({
          where: { OrderId: order.id },
        });
        const orderProducts = [];
        for (let orderItem of orderItems) {
          let product = await Product.findOne({
            where: { id: orderItem.ProductId },
          });
          orderProducts.push({
            product,
            quantity: orderItem.quantity,
          });
        }
        allOrder.push({
          id: order.id,
          orderItems: orderProducts,
          orderDate: convertTimestampToDate(order.createdAt),
          deliveryLocation: {
            city: order.city,
            address: order.address,
          },
          totalItems: order.totalItems,
          totalPrice: order.totalPrice,
        });
      }

      return allOrder;
    },
  },

  Mutation: {
    updateUserProfile: async (_, { firstName, lastName, email }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const userInfo = await User.findByPk(user.id);
          if (userInfo) {
            userInfo.update(
              { firstName, lastName, email: email.toLowerCase() },
              { where: { id: user.id } }
            );
            return {
              firstName,
              lastName,
              email,
            };
          }
        }
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
  },
};
