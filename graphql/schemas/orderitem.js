const { gql } = require("apollo-server-express");

module.exports = gql`
  type OrderItem {
    id: Int!
    food: Food!
    quantity: Int!
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    getAllOrderItems: [OrderItem!]
    getSingleOrderItem(orderItemId: Int!): OrderItem
  }

  extend type Mutation {
    createOrderItem(
      orderId: Int!
      foodId: Int!
      quantity: Int!
    ): CreateOrderItemResponse
  }

  type CreateOrderItemResponse {
    id: Int!
  }
`;
