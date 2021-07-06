"use strict";
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../src/utils/hashing");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          name: "Admin",
          email: "admin@gmail.com",
          password: await hashPassword("admin12345"),
          gender: "universal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("users", null, {});
    };
  },
};
