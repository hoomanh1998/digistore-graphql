"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Brands", [
      {
        name: "Asus",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Apple",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Google",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Logitech",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Microsoft",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Samsung",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sony",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Brands", null, {});
  },
};
