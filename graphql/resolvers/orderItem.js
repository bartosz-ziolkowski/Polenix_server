const { Order, OrderItem, Food } = require("../../database/models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createOrderItem(_, { foodId }, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to create an order item");
      }

      const food = await Food.findByPk(foodId);

      if (!food) {
        throw new ApolloError("Food not found");
      }

      if (food.quantity <= 0) {
        throw new Error("Food out of stock");
      }

      let order = await Order.findOne({
        where: { userId: user.id, status: "DRAFT" },
      });

      if (!order) {
        order = await Order.create({ userId: user.id });
      }

      const orderItem = await order.getOrderItems().then((orderItems) => {
        return orderItems.find((orderItem) => orderItem.foodId === foodId);
      });

      try {
        if (!orderItem) {
          const newOrderItem = await order.createOrderItem({
            foodId,
            quantity: 1,
          });
          updateFoodAndOrderAmount(food, order, -1);
          return newOrderItem;
        } else {
          await orderItem.update({ quantity: orderItem.quantity + 1 });
          updateFoodAndOrderAmount(food, order, -1);
          return orderItem;
        }
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          throw new ApolloError("Validation error", {
            validationErrors: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        } else {
          throw new ApolloError("Unable to create an order item");
        }
      }
    },

    async updateOrderItemQuantity(_, { orderItemId, toIncreaseQuantity }) {
      const orderItem = await OrderItem.findByPk(orderItemId);
      if (!orderItem) {
        throw new ApolloError("Order item not found");
      }

      const food = await orderItem.getFood();

      if (food.quantity <= 0 && toIncreaseQuantity) {
        throw new Error("Out of stock");
      }

      const quantityChange = toIncreaseQuantity ? 1 : -1;

      await food.update({ quantity: food.quantity - quantityChange });

      await orderItem.update({ quantity: orderItem.quantity + quantityChange });
      orderItem.quantity === 0 && (await orderItem.destroy());

      const order = await orderItem.getOrder();

      const orderItems = await order.getOrderItems();
      orderItems.length === 0
        ? await order.destroy()
        : await updateOrderAmount(order);

      return orderItem;
    },

    async removeOrderItem(_, { orderItemId }, context) {
      const orderItem = await OrderItem.findByPk(orderItemId);
      if (!orderItem) {
        throw new ApolloError("Order item not found");
      }

      const food = await orderItem.getFood();
      await food.update({ quantity: food.quantity + orderItem.quantity });

      try {
        await orderItem.destroy();

        const order = await orderItem.getOrder();
        const orderItems = await order.getOrderItems();
        orderItems.length === 0
          ? await order.destroy()
          : await updateOrderAmount(order);

        return orderItem;
      } catch (error) {
        throw new ApolloError("Unable to remove an order item");
      }
    },
  },

  Query: {
    async getAllOrderItems(root, args, context) {
      return await OrderItem.findAll();
    },

    async getSingleOrderItem(_, { orderItemId }, context) {
      return await OrderItem.findByPk(orderItemId);
    },
  },

  OrderItem: {
    async food(orderItem) {
      return await orderItem.getFood();
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

async function updateFoodAndOrderAmount(food, order, quantityChange) {
  food.quantity += quantityChange;
  try {
    await food.save();
    await updateOrderAmount(order);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      throw new ApolloError("Validation error", {
        validationErrors: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    } else {
      throw new ApolloError("Unable to update order amount");
    }
  }
}
