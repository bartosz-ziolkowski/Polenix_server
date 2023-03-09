const { gql, IResolvers, makeExecutableSchema } = require("apollo-server");

const typeDefs = gql`
  # weather schema
  type Weather {
    id: ID!
    cityName: String!
    sunrise: String!
    sunset: String!
    currentWeather: CurrentWeather!
    cod: Int!
  }
  type CurrentWeather {
    status: String!
    icon: String!
    temp: Float!
    feels_like: Float!
    tempHigh: Float!
    tempLow: Float!
    pressure: Int!
    humidity: Int!
    windSpeed: Float!
  }

  type Query {
    weatherByCity(cityName: String!): Weather
  }
`;

module.exports = typeDefs