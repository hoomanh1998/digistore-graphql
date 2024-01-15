const { Cart, CartItem, Product } = require("../../models");
const { checkUserToken } = require("../../util");

module.exports = {
  Mutation: {
    addItemToCart: async (_, { product_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const cart = await Cart.findOne({
            where: { UserId: user.id },
          });

          if (cart) {
            const cartItems = await CartItem.findAll({
              raw: true,
              where: { CartId: cart.id },
            });

            const productIds = cartItems.map((item) => item.ProductId);

            const isProductExist =
              productIds.length > 0 &&
              productIds.includes(parseInt(product_id));

            if (!isProductExist) {
              const newCartItem = await CartItem.create({
                ProductId: product_id,
                CartId: cart.id,
              });

              const product = await Product.findOne({
                raw: true,
                where: { id: product_id },
              });

              return {
                id: newCartItem.id,
                product,
                quantity: 1,
              };
            } else {
              const existingCartItem = await CartItem.findOne({
                attributes: ["id"],
                where: { ProductId: product_id, CartId: cart.id },
              });

              const existingProduct = await Product.findOne({
                raw: true,
                where: { id: product_id },
              });

              const { quantity } = await existingCartItem.increment("quantity");

              return {
                id: existingCartItem.id,
                product: existingProduct,
                quantity,
              };
            }
          }
        } else {
          throw new Error("Could not find the cart");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    addItemsFromClient: async (_, { cartItems }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const cart = await Cart.findOne({
            where: { UserId: user.id },
          });

          const existingCartItems = await CartItem.findAll({
            where: { CartId: cart.id },
            order: [["id", "ASC"]],
          });

          const transformedCartItems = [];

          if (existingCartItems.length > 0) {
            let isExist = false;

            for (let cartItem of cartItems) {
              for (let existingCartItem of existingCartItems) {
                if (
                  cartItem.productId === existingCartItem.ProductId.toString()
                ) {
                  isExist = true;
                  existingCartItem.quantity += cartItem.quantity;

                  transformedCartItems.push({
                    method: "UPDATE",
                    ProductId: existingCartItem.ProductId,
                    quantity: existingCartItem.quantity,
                  });
                  break;
                }
              }

              if (!isExist) {
                transformedCartItems.push({
                  method: "INSERT",
                  ProductId: cartItem.productId,
                  quantity: cartItem.quantity,
                });
              }

              isExist = false;
            }

            transformedCartItems.forEach(async (item) => {
              if (item.method === "UPDATE") {
                await CartItem.update(
                  {
                    quantity: item.quantity,
                  },
                  {
                    where: { CartId: cart.id, ProductId: item.ProductId },
                    order: [["id", "ASC"]],
                  }
                );
              }
              if (item.method === "INSERT") {
                await CartItem.create({
                  CartId: cart.id,
                  ProductId: item.ProductId,
                  quantity: item.quantity,
                });
              }
            });
          } else {
            const transformedCartItems = cartItems.map((cartItem) => ({
              CartId: cart.id,
              ProductId: cartItem.productId,
              quantity: cartItem.quantity,
            }));

            await CartItem.bulkCreate(transformedCartItems, {
              returning: true,
            });
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    removeItemFromCart: async (_, { product_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const cart = await Cart.findOne({
            where: { UserId: user.id },
          });

          const cartItem = await CartItem.findOne({
            where: { CartId: cart.id, ProductId: product_id },
          });

          if (cartItem) {
            await cartItem.destroy({
              where: { CartId: cart.id, ProductId: product_id },
            });

            const product = await Product.findOne({
              raw: true,
              where: { id: product_id },
            });

            return {
              id: cartItem.id,
              product,
              quantity: cartItem.quantity,
            };
          } else {
            throw new Error("Could not remove the cart item.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    increaseCartItemQuantity: async (_, { product_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const cart = await Cart.findOne({
            where: { UserId: user.id },
          });

          const cartItem = await CartItem.findOne({
            where: { CartId: cart.id, ProductId: product_id },
          });

          if (cartItem) {
            const { quantity } = await cartItem.increment("quantity");

            const product = await Product.findOne({
              raw: true,
              where: { id: product_id },
            });

            return {
              id: cartItem.id,
              product,
              quantity,
            };
          } else {
            throw new Error("Could not increase cart item quantity.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    decreaseCartItemQuantity: async (_, { product_id }, { user }) => {
      try {
        if (checkUserToken(user)) {
          const cart = await Cart.findOne({
            where: { UserId: user.id },
          });

          const cartItem = await CartItem.findOne({
            where: { CartId: cart.id, ProductId: product_id },
          });

          if (cartItem && cartItem.quantity > 1) {
            const { quantity } = await cartItem.decrement("quantity");

            const product = await Product.findOne({
              raw: true,
              where: { id: product_id },
            });

            return {
              id: cartItem.id,
              product,
              quantity,
            };
          } else {
            throw new Error("Can not decrease cart item quantity.");
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
