const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("../graphql/schemas");
const context = require("../graphql/context");
const resolvers = require("../graphql/resolvers");
const WeatherAPI = require("../graphql/dataSources/weather");
const app = express();

app.use(
  cors({
    origin: "https://polenix-4ee0a.web.app",
    credentials: true,
  })
);

const apolloServer = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
  }),
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      "schema.polling.enable": false,
    },
  },
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: "/api" });
});

const server = createServer(app);

module.exports = server;
