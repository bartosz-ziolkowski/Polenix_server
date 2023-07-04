const { Category, Food } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createFood(
      _,
      { categoryId, name, quantity, price },
      { user = null }
    ) {
      if (!user) {
        throw new AuthenticationError("You must login to create a food");
      }
      
      const category = await Category.findByPk(categoryId);

      if (category) {
        return category.createFood({ name, quantity, price });
      }
      
      throw new ApolloError("Unable to create a food");
    },
  },

  Query: {
    async getAllFood(root, args, context) {
      return Food.findAll();
    },
    async getSingleFood(_, { foodId }, context) {
      return Food.findByPk(foodId);
    },
  },

  Food: {
    category(food) {
      return food.getCategory();
    },
  },
};
