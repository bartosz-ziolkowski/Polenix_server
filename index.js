const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const dataSources = require('./datasource')

const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const db = require("./models");
/*const graphql, {GraphQLObjectType, GraphQLSchema, GraphQLString} = require('graphql');*/
const { graphqlHTTP } = require('express-graphql');

const mealRouter = require('./routes/Meal');
const { ApolloServer } = require('apollo-server-express');
app.use("/meals", mealRouter);

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
        console.log(`gql path is ${apolloServer.graphqlPath}`)
    });
});

