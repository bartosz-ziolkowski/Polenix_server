const { Order, OrderItem } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createOrderItem(_, { foodId }, { user = null }) {
      if (!user) {
        throw new AuthenticationError(
          "You must log in to create an order item"
        );
      }

      const order = await Order.findOne({
        where: { userId: user.id, status: "DRAFT" },
      });

      if (order) {
        const orderItem = await order.getOrderItems().then((orderItems) => {
          return orderItems.find((orderItem) => orderItem.foodId === foodId);
        });

        if (!orderItem) {
          const newOrderItem = await order.createOrderItem({
            foodId,
            quantity: 1,
          });
          await updateOrderAmount(order);
          const food = await newOrderItem.getFood();
          await food.update({ quantity: food.quantity - 1 });
          return newOrderItem;
        }

        const food = await orderItem.getFood();

        if (food.quantity === 0) {
          throw new Error("Food is out of stock");
        } else {
          await food.update({ quantity: food.quantity - 1 });
        }

        const { quantity } = orderItem;
        await orderItem.update({ quantity: quantity + 1 });
        await updateOrderAmount(order);
        return orderItem;
      } else {
        const newOrder = await Order.create({
          userId: user.id,
        });
        const newOrderItem = await newOrder.createOrderItem({
          foodId,
          quantity: 1,
        });
        await updateOrderAmount(newOrder);
        const food = await newOrderItem.getFood();
        await food.update({ quantity: food.quantity - 1 });
        return newOrderItem;
      }
    },

    async updateOrderItemQuantity(_, { orderItemId, toIncreaseQuantity }) {
      const orderItem = await OrderItem.findByPk(orderItemId);
      const food = await orderItem.getFood();
      const quantityChange = toIncreaseQuantity ? 1 : -1;

      await food.update({ quantity: food.quantity - quantityChange });
      await orderItem.update({ quantity: orderItem.quantity + quantityChange });

      const order = await orderItem.getOrder();
      await updateOrderAmount(order);

      if (orderItem.quantity === 0) {
        await orderItem.destroy();
      }

      const orderItems = await order.getOrderItems();

      if (orderItems.length === 0) {
        await order.destroy();
      }

      return orderItem;
    },

    async removeOrderItem(_, { orderItemId }, context) {
      const orderItem = await OrderItem.findByPk(orderItemId);
      const food = await orderItem.getFood();
      await food.update({ quantity: food.quantity + orderItem.quantity });
      const order = await orderItem.getOrder();
      await orderItem.destroy();
      await updateOrderAmount(order);
      const orderItems = await order.getOrderItems();
      orderItems.length === 0 && (await order.destroy());
      return orderItem;
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

async function updateOrderAmount(order) {
  const orderItems = await order.getOrderItems();
  const prices = await Promise.all(
    orderItems.map(async (orderItem) => {
      const food = await orderItem.getFood();
      return orderItem.quantity * food.price;
    })
  );
  const amount = prices.reduce((sum, price) => sum + price, 0);
  await order.update({ amount });
}
