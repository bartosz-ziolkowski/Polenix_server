require("dotenv").config();
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { User, Order, OrderItem } = require("../../database/models");

module.exports = {
  Mutation: {
    async login(root, { email, password }, context) {
      const user = await User.findOne({
        where: { email },
        include: {
          model: Order,
          as: "orders",
        },
      });

      if (!user) {
        throw new AuthenticationError("No user with that email");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { ...user.toJSON(), token };
    },

    async register(root, args, context) {
      const { email, phoneNumber } = args.input;

      if (await User.findOne({ where: { email } })) {
        throw new AuthenticationError("Email already exists");
      }

      if (await User.findOne({ where: { phoneNumber } })) {
        throw new AuthenticationError("Phone number already taken");
      }

      try {
        return await User.create({
          ...args.input,
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
          throw new ApolloError("Unable to create a user");
        }
      }
    },

    async updateUserData(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError("You must login to update your data");
      }

      const existingUser = await User.findOne({
        where: {
          phoneNumber: args.input.phoneNumber,
          id: { [Op.ne]: user.id },
        },
      });

      if (existingUser) {
        throw new AuthenticationError("Phone number already taken");
      }

      try {
        await User.update(
          {
            ...args.input,
          },
          { where: { id: user.id } }
        );
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          throw new ApolloError("Validation error", {
            validationErrors: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        } else {
          throw new ApolloError("Unable to update your data");
        }
      }

      const updatedUser = await User.findOne({ where: { id: user.id } });

      return {
        id: updatedUser.id,
        email: updatedUser.email,
      };
    },
  },

  Query: {
    async getUserOrders(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError("You must log in to get your orders");
      }
      try {
        return await Order.findAll({
          where: { userId: user.id },
          include: {
            model: OrderItem,
            as: "orderItems",
          },
          order: [["createdAt", "DESC"]],
        });
      } catch (error) {
        throw new ApolloError("Unable to get your orders");
      }
    },

    async getUser(root, { userId }, context) {
      return await User.findByPk(userId);
    },
  },
};
