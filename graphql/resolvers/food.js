const { Category, Food } = require("../../database/models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createFood(
      _,
      { categoryId, name, quantity, price },
      { user = null }
    ) {
      if (!user || user.type === "CUSTOMER") {
        throw new AuthenticationError("Not authorized to create a food");
      }

      const existingFood = await Food.findOne({ where: { name } });
      if (existingFood) {
        throw new ApolloError("Food already exists");
      }

      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new ApolloError("Category not found");
      }

      if (quantity < 0 || price < 10) {
        throw new ApolloError("Invalid quantity or price");
      }

      try {
        return await Food.create({
          categoryId,
          name,
          quantity,
          price,
        });
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          throw new ApolloError("Validation error", {
            validationErrors: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        } else {
          throw new ApolloError("Unable to create a food");
        }
      }
    },
  },

  Query: {
    async getAllFood(root, args, context) {
      return await Food.findAll();
    },
    
    async getSingleFood(_, { foodId }, context) {
      return await Food.findByPk(foodId);
    },
    
    async getFoodByCategory(_, { categoryId }, context) {
      return await Food.findAll({
        where: { categoryId: categoryId },
      });
    },
  },

  Food: {
    async category(food) {
      return await food.getCategory();
    },
  },
};
