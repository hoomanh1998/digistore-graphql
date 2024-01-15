const { gql } = require("apollo-server");
const Location = require("./Location");
const User = require("./User");
const Product = require("./Product");
const Brand = require("./Brand");
const Category = require("./Category");
const WishList = require("./WishList");
const Cart = require("./Cart");
const Order = require("./Order");
const Auth = require("./Auth");

const types = [];
const inputs = [];
const querise = [];
const mutations = [];

const schemas = [
  User,
  Location,
  WishList,
  Cart,
  Order,
  Product,
  Brand,
  Category,
  Auth,
];

schemas.forEach((s) => {
  types.push(s.types);
  if (s.inputs !== null) {
    inputs.push(s.inputs);
  }
  if (s.querise !== null) {
    querise.push(s.querise);
  }
  if (s.mutations !== null) {
    mutations.push(s.mutations);
  }
});

const typeDefs = gql`
  ${types.join("\n")}
  ${inputs.join("\n")}
  
  type Query {
    ${querise.join("\n")}
  }

  type Mutation {
    ${mutations.join("\n")}
  }
`;

module.exports = typeDefs;
