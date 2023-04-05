const { gql } = require("apollo-server-express");

module.exports = gql`
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
