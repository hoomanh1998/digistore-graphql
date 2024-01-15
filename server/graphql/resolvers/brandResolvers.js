const { Brand } = require("../../models");
const db = require("../../models");

module.exports = {
  Query: {
    brand: async (_, { brand_id }) => {
      try {
        const brand = await Brand.findByPk(brand_id);
        return brand;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    brands: async () => {
      try {
        const brands = await Brand.findAll({ raw: true });
        return brands;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
