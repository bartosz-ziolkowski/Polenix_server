const { Order, OrderItem } = require("../../database/models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createOrder(_, { delivery }, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to create an order");
      }
      try {
        return await Order.create({
          userId: user.id,
          delivery: delivery,
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
          throw new ApolloError("Unable to create an order");
        }
      }
    },

    async updateOrder(_, { orderId, delivery, status }, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to update an order");
      }

      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new ApolloError("Order not found");
      }

      if (
        (order.userId !== user.id &&
          user.type !== "ADMIN" &&
          user.type !== "EMPLOYEE") ||
        (order.userId === user.id && order.status !== "DRAFT")
      ) {
        throw new ApolloError("Not authorized to update order");
      }

      order.status = status || order.status;

      order.amount +=
        delivery && !order.delivery
          ? 50
          : order.delivery && !delivery
          ? -50
          : 0;
      order.delivery = delivery;

      try {
        return await order.save();
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          throw new ApolloError("Validation error", {
            validationErrors: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        } else {
          throw new ApolloError("Unable to update an order");
        }
      }
    },

    async removeOrder(_, { orderId }, context) {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new ApolloError("Order not found");
      }

      const orderItems = await order.getOrderItems();
      const deletedFoodIds = [];

      for (let i = 0; i < orderItems.length; i++) {
        const orderItem = orderItems[i];
        const food = await orderItem.getFood();
        await food.update({ quantity: food.quantity + orderItem.quantity });
        deletedFoodIds.push(food.id);
        await orderItem.destroy();
      }

      try {
        await order.destroy();
        return { deletedFoodIds, orderId: order.id };
      } catch (error) {
        throw new ApolloError("Unable to remove an order");
      }
    },
  },

  Query: {
    async getAllOrders(root, args, context) {
      return await Order.findAll();
    },

    async getSingleOrder(_, { orderId }, context) {
      return await Order.findByPk(orderId);
    },
  },

  Order: {
    async orderItems(order) {
      return await OrderItem.findAll({
        where: { orderId: order.id },
      });
    },

    async customer(order) {
      return await order.getUser();
    },
  },
};
