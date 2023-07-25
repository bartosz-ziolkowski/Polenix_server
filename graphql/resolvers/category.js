const { Category } = require("../../database/models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createCategory(_, { name }, { user = null }) {
      if (!user || user.type === "CUSTOMER") {
        throw new AuthenticationError("Not authorized to create a category");
      }
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        throw new ApolloError("Category already exists");
      }

      if (name.length < 3 || name.length > 20) {
        throw new ApolloError("Invalid category name");
      }

      try {
        return await Category.create({ name });
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          throw new ApolloError("Validation error", {
            validationErrors: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        } else {
          throw new ApolloError("Unable to create a category");
        }
      }
    },
  },

  Query: {
    async getAllCategories(root, args, context) {
      return await Category.findAll();
    },

    async getSingleCategory(_, { categoryId }, context) {
      return await Category.findByPk(categoryId);
    },
  },

  Category: {
    async food(category) {
      return await category.getFood();
    },
  },
};
