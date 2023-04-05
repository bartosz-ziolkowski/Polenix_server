module.exports = {
  Query: {
    weatherByCity(_, { cityName }, { dataSources }) {
      return dataSources.weatherAPI.getWeather(cityName);
    },
  },
};
