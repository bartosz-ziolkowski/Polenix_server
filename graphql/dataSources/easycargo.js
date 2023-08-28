require("dotenv").config({ path: ".env.local" });

const { RESTDataSource } = require("apollo-datasource-rest");

const EASYCARGO_USERNAME = process.env.REACT_APP_EASYCARGO_USERNAME;
const EASYCARGO_API_KEY = process.env.REACT_APP_EASYCARGO_API_KEY;
const API_URL = "http://go.easycargo3d.com/api/v1/";

class EasyCargoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  async getAuthToken() {
    const requestData = {
      username: EASYCARGO_USERNAME,
      api_key: EASYCARGO_API_KEY,
    };

    const response = await this.post("authentication", requestData);
    return response;
  }

  async getShipments(shipmentId) {
    const tokenResponse = await this.getAuthToken();
    const newToken = tokenResponse.authentication_token;

    let response;

    if (shipmentId) {
      response = await this.get(
        `shipments/${shipmentId}`,
        {},
        {
          headers: {
            "X-AuthenticationToken": newToken,
          },
        }
      );
      return [response];
    } else {
      response = await this.get(
        "shipments",
        {},
        {
          headers: {
            "X-AuthenticationToken": newToken,
          },
        }
      );
      return response;
    }
  }
}

module.exports = EasyCargoAPI;
