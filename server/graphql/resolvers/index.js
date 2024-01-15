const _ = require("lodash");
const authResolvers = require("./authResolvers");
const userResolvers = require("./userResolvers");
const locationResolvers = require("./locationResolvers");
const wishListResolvers = require("./wishListResolvers");
const cartResolvers = require("./cartResolvers");
const orderResolvers = require("./orderResolvers");
const productResolvers = require("./productResolvers");
const brandResolvers = require("./brandResolvers");
const categoryResolvers = require("./categoryResolvers");

module.exports = _.merge(
  {},
  authResolvers,
  userResolvers,
  locationResolvers,
  wishListResolvers,
  cartResolvers,
  orderResolvers,
  productResolvers,
  brandResolvers,
  categoryResolvers
);
