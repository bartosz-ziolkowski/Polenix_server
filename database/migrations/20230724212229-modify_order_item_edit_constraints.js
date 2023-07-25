"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("OrderItems", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("OrderItems", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    });
  },
};
