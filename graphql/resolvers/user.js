const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();
const { User } = require("../../database/models");

module.exports = {
  Mutation: {
    async login(root, { email, password }, context) {
      const user = await User.findOne({ where: { email } });
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
};
