const { gql } = require("apollo-server-express");

module.exports = gql`
  type Category {
    id: Int!
    name: String!
    food: [Food!]
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    getAllCategories: [Category!]
    getSingleCategory(categoryId: Int!): Category
  }

  extend type Mutation {
    createCategory(name: String!): CreateCategoryResponse
  }

  type CreateCategoryResponse {
    id: Int!
    name: String!
  }
`;
