const types = `
  type Category {
    id: ID!
    name: String!
  }
`;

const inputs = null;

const querise = `
  category(category_id: Int!): Category
  categories: [Category]!
`;

const mutations = `
  addCategory(name: String!): Category!
  updateCategory(id: ID!, name: String!): Category!
  deleteCategory(id: ID!): Category!
`;

module.exports = { types, inputs, querise, mutations };
