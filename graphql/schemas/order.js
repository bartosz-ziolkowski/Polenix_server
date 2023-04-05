const { gql } = require("apollo-server-express");

module.exports = gql`
  type Order {
    id: Int!
    customer: User!
    orderItems: [OrderItem!]
    amount: Float!
    status: StatusType!
    delivery: Boolean!
    createdAt: String!
    updatedAt: String
  }

  enum StatusType {
    RECEIVED
    IN_PROGRESS
    COMPLETED
  }

  extend type Query {
    getAllOrders: [OrderItem!]
    getSingleOrder(orderId: Int!): Order
  }

  extend type Mutation {
    createOrder(delivery: Boolean!): CreateOrderItemResponse
  }

  type CreateOrderResponse {
    id: Int!
  }
`;
