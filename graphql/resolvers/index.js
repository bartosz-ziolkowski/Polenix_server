const categoryResolvers = require("./category");
const foodResolvers = require("./food");
const orderResolvers = require("./order");
const orderItemResolvers = require("./orderItem");
const userResolvers = require("./user");
const weatherResolvers = require("./weather");
const easyCargoResolvers = require("./easycargo");

module.exports = [
  userResolvers,
  foodResolvers,
  orderItemResolvers,
  orderResolvers,
  categoryResolvers,
  weatherResolvers,
  easyCargoResolvers,
];
