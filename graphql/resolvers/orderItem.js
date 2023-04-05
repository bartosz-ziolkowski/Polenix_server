const { Order, OrderItem } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createOrderItem(_, { orderId, foodId, quantity }, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to create an order item");
      }
      const order = await Order.findByPk(orderId);

      if (order) {
        return order.createOrderItem({ foodId, quantity });
      }
      throw new ApolloError("Unable to create an order item");
    },
  },

  Query: {
    async getAllOrderItems(root, args, context) {
      return OrderItem.findAll();
    },
    async getSingleOrderItem(_, { orderItemId }, context) {
      return OrderItem.findByPk(orderItemId);
    },
  },

  OrderItem: {
    food(orderItem) {
      return orderItem.getFood();
    },
  },
};
