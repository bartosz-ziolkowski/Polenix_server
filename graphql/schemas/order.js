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
    DRAFT
    RECEIVED
    IN_PROGRESS
    COMPLETED
  }

  extend type Mutation {
    createOrder(delivery: Boolean!): CreateOrderResponse
    updateOrder(orderId: Int!, delivery: Boolean, status: StatusType): Order
    removeOrder(orderId: Int!): RemoveOrderResponse
  }

  extend type Query {
    getAllOrders: [Order!]
    getSingleOrder(orderId: Int!): Order
  }

  type CreateOrderResponse {
    id: Int!
  }

  type RemoveOrderResponse {
    deletedFoodIds: [Int!]!
    orderId: Int!
  }
`;
