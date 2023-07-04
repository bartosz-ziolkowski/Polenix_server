require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
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

      if (!bcrypt.compareSync(password, user.password)) {
        throw new AuthenticationError("Incorrect password");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { ...user.toJSON(), token };
    },

    async register(root, args, context) {
      const {
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        address,
        zipCode,
        city,
        password,
      } = args.input;

      if (await User.findOne({ where: { email } })) {
        throw new AuthenticationError("Email already exists");
      }

      if (await User.findOne({ where: { phoneNumber } })) {
        throw new AuthenticationError("Phone number already taken");
      }
      return User.create({
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        address,
        zipCode,
        city,
        password: await bcrypt.hash(password, 10),
      });
    },
  },

  Query: {
    async getUserOrders(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError("You must log in to get your orders");
      }
      return Order.findAll({
        where: { userId: user.id },
        include: {
          model: OrderItem,
          as: "orderItems",
        },
      });
    },
    async getUser(root, { userId }, context) {
      return User.findByPk(userId);
    },
  },
};
