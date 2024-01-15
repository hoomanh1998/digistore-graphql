const types = `
  type WishList {
    id: ID!
    items: [Product]
  }
`;

const inputs = null;

const querise = null;

const mutations = `
  addToWishList(product_id: String!): Boolean!
  removeFromWishList(product_id: String!): Product
`;

module.exports = { types, inputs, querise, mutations };
