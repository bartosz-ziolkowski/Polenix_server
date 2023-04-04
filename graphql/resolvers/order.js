const { Order } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createOrder(_, { delivery }, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to create an order");
      }
      return Order.create({
        userId: user.id,
        delivery: delivery,
      });
    },
  },

  Query: {
    async getAllOrders(root, args, context) {
      return Order.findAll();
    },
    async getSingleOrder(_, { orderId }, context) {
      return Order.findByPk(orderId);
    },
  },

  Order: {
    orderItems(order) {
      return order.getOrderItems();
    },
    customer(order) {
      return order.getUser();
    },
  },
};
