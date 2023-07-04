const { Category } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createCategory(_, { name }, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to create a category");
      }
      return Category.create({
        name: name,
      });
    },
  },

  Query: {
    async getAllCategories(root, args, context) {
      return Category.findAll();
    },
    async getSingleCategory(_, { categoryId }, context) {
      return Category.findByPk(categoryId);
    },
  },

  Category: {
    food(category) {
      return category.getFood();
    },
  },
};
