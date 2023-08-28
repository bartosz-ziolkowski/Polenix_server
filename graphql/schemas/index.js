const { gql } = require("apollo-server-express");
const categoryType = require("./category");
const foodType = require("./food");
const orderType = require("./order");
const OrderItemType = require("./orderitem");
const userType = require("./user");
const weatherType = require("./weather");
const easyCargoType = require("./easycargo");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [
  rootType,
  categoryType,
  foodType,
  orderType,
  OrderItemType,
  userType,
  weatherType,
  easyCargoType,
];
