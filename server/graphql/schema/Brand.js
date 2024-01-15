const types = `
  type Brand {
    id: ID!
    name: String!
  }
`;

const inputs = null;

const querise = `
  brand(brand_id: Int!): Brand
  brands: [Brand]!
`;

const mutations = `
  addBrand(name: String!): Brand!
  updateBrand(id: ID!, name: String!): Brand!
  deleteBrand(id: ID!): Brand!
`;

module.exports = { types, inputs, querise, mutations };
