require("dotenv").config({ path: ".env.local" });

const { RESTDataSource } = require("apollo-datasource-rest");

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  async getWeather(cityName) {
    const response = await this.get(
      `?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    return this.weatherReducer(response, cityName);
  }

  weatherReducer(weather, cityName) {
    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
      "pl-PL",
      { hour: "2-digit", minute: "2-digit" }
    );
    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString(
      "pl-PL",
      { hour: "2-digit", minute: "2-digit" }
    );
    return {
      id: weather.id || 0,
      cityName: cityName,
      sunrise,
      sunset,
      cod: weather.cod,
      currentWeather: {
        status: weather.weather[0].main,
        icon: weather.weather[0].icon,
        temp: weather.main.temp,
        tempHigh: weather.main.temp_max,
        tempLow: weather.main.temp_min,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        feels_like: weather.main.feels_like,
      },
    };
  }
}

module.exports = WeatherAPI;
