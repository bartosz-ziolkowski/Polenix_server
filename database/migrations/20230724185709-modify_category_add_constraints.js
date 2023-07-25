"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Categories", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
      },
    });
  },

  async down(queryInterface, Sequelize) {},
};
