const {
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Location,
} = require("../../models");
const { checkUserToken, convertTimestampToDate } = require("../../util");

module.exports = {
  Query: {
    order: async (_, { orderId }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const order = await Order.findOne({
            raw: true,
            where: { id: orderId, UserId: user.id },
          });

          const orderItems = await OrderItem.findAll({
            raw: true,
            attributes: ["ProductId", "quantity"],
            where: { OrderId: orderId },
          });

          const orderItemProductIds = orderItems.map(
            (orderItem) => orderItem.ProductId
          );

          const productItems = await Product.findAll({
            raw: true,
            attributes: ["id", "title", "price", "CategoryId"],
            where: { id: orderItemProductIds },
          });

          const transferedOrderedItems = [];
          for (let product of productItems) {
            for (let order of orderItems) {
              if (order.ProductId === product.id) {
                transferedOrderedItems.push({
                  product: {
                    ...product,
                  },
                  quantity: order.quantity,
                });
              }
            }
          }

          const { id, createdAt, city, address, totalItems, totalPrice } =
            order;

          return {
            id,
            orderItems: transferedOrderedItems,
            orderDate: convertTimestampToDate(createdAt),
            deliveryLocation: {
              city,
              address,
            },
            totalItems,
            totalPrice,
          };
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    registerOrder: async (_, { selectedLocationId }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const cart = await Cart.findOne({
            where: { UserId: user.id },
          });

          if (cart) {
            const cartItems = await CartItem.findAll({
              raw: true,
              include: [
                {
                  model: Product,
                  attributes: ["price"],
                  required: true,
                },
              ],
              where: { CartId: cart.id },
              order: [["id", "ASC"]],
            });

            const cartItemIds = cartItems.map((cartItem) => cartItem.id);

            const totalItems = cartItems.reduce(
              (acc, currItem) => acc + currItem.quantity,
              0
            );

            const totalPrice = cartItems.reduce(
              (acc, currItem) =>
                acc + currItem["Product.price"] * currItem.quantity,
              0
            );

            const location = await Location.findOne({
              raw: true,
              attributes: ["city", "address"],
              where: { id: selectedLocationId, UserId: user.id },
            });

            const productIds = cartItems.map((cartItem) => cartItem.ProductId);

            await CartItem.destroy({ where: { id: cartItemIds } });

            const products = await Product.findAll({
              raw: true,
              where: { id: productIds },
            });

            const order = await Order.create({
              UserId: user.id,
              city: location.city,
              address: location.address,
              totalItems,
              totalPrice,
            });

            cartItems.forEach(async ({ ProductId, quantity }) => {
              await OrderItem.create({
                OrderId: order.id,
                ProductId,
                quantity,
              });
            });

            const transferedOrderedItems = [];
            for (let product of products) {
              for (let cartItem of cartItems) {
                if (cartItem.ProductId === product.id) {
                  transferedOrderedItems.push({
                    product: {
                      ...product,
                    },
                    quantity: cartItem.quantity,
                  });
                }
              }
            }

            return {
              id: order.id,
              orderItems: transferedOrderedItems,
              orderDate: convertTimestampToDate(order.createdAt),
              deliveryLocation: {
                city: order.city,
                address: order.address,
              },
              totalItems: order.totalItems,
              totalPrice: order.totalPrice,
            };
          } else {
            throw new Error("Can not register an order.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
