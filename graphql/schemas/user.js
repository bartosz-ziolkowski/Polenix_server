const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int!
    type: UserType!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    dateOfBirth: String!
    address: String!
    zipCode: String!
    city: String!
    password: String!
    orders: [Order!]
    createdAt: String!
    updatedAt: String
  }

  enum UserType {
    CUSTOMER
    EMPLOYEE
    ADMIN
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(email: String!, password: String!): LoginResponse
  }

  input RegisterInput {
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    dateOfBirth: String!
    address: String!
    zipCode: String!
    city: String!
    password: String!
  }

  type RegisterResponse {
    id: Int!
    email: String!
  }

  type LoginResponse {
    id: Int!
    type: UserType!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    dateOfBirth: String!
    address: String!
    zipCode: String!
    city: String!
    orders: [Order!]
    token: String!
  }
`;
