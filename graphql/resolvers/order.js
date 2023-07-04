const { Order, OrderItem } = require("../../database/models");
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
    async updateOrder(_, { orderId, delivery, status }, context) {
      const order = await Order.findByPk(orderId);

      order.status = status || order.status;
      order.amount +=
        delivery && !order.delivery
          ? 50
          : order.delivery && !delivery
          ? -50
          : 0;
      order.delivery = delivery;
      return order.save();
    },

    async removeOrder(_, { orderId }, context) {
      const order = await Order.findByPk(orderId);
      const orderItems = await order.getOrderItems();
      
      for (let i = 0; i < orderItems.length; i++) {
        const orderItem = orderItems[i];
        const food = await orderItem.getFood();
        await food.update({ quantity: food.quantity + orderItem.quantity });
        await orderItem.destroy();
      }
      
      return order.destroy();
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
    async orderItems(order) {
      const orderItems = await OrderItem.findAll({
        where: { orderId: order.id },
      });
      return orderItems;
    },
    async customer(order) {
      return order.getUser();
    },
  },
};
