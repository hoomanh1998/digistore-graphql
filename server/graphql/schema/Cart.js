const types = `
  type Cart {
    id: ID!
    items: [CartItem]
    totalItems: Int
    totalPrice: Int
  }
  type CartItem {
    id: ID!
    product: Product
    quantity: Int
  }
`;

const inputs = `
  input CartItemsInput {
    productId: String
    quantity: Int
  }
`;

const querise = null;

const mutations = `
  addItemToCart(product_id: String!): CartItem
  addItemsFromClient(cartItems: [CartItemsInput]): Boolean
  removeItemFromCart(product_id: String!): CartItem
  increaseCartItemQuantity(product_id: String!): CartItem
  decreaseCartItemQuantity(product_id: String!): CartItem
`;

module.exports = { types, inputs, querise, mutations };
