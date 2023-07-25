"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Food", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    });

    await queryInterface.changeColumn("Food", "price", {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        min: 10,
      },
    });

    await queryInterface.changeColumn("Food", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 50],
      },
    });
  },

  async down(queryInterface, Sequelize) {},
};
