const { gql } = require("apollo-server-express");

module.exports = gql`
  type OrderItem {
    id: Int!
    food: Food!
    quantity: Int!
    createdAt: String!
    updatedAt: String
  }

  extend type Mutation {
    createOrderItem(foodId: Int!): CreateOrderItemResponse
    updateOrderItemQuantity(
      orderItemId: Int!
      toIncreaseQuantity: Boolean!
    ): OrderItem
    removeOrderItem(orderItemId: Int!): OrderItem
  }

  extend type Query {
    getAllOrderItems: [OrderItem!]
    getSingleOrderItem(orderItemId: Int!): OrderItem
  }

  type CreateOrderItemResponse {
    id: Int!
  }
`;
