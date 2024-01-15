"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Mobile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tablet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laptop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Console",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Controller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Headset",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Keyboard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
