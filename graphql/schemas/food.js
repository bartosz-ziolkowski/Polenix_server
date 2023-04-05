const { gql } = require("apollo-server-express");

module.exports = gql`
  type Food {
    id: Int!
    name: String!
    quantity: Int!
    price: Float!
    category: Category!
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    getAllFood: [Food!]
    getSingleFood(foodId: Int!): Food
  }

  extend type Mutation {
    createFood(
      categoryId: Int!
      name: String!
      quantity: Int!
      price: Float!
    ): CreateFoodResponse
  }

  type CreateFoodResponse {
    id: Int!
    name: String!
  }
`;
