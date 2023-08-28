module.exports = {
  Query: {
    getShipments(_, { shipmentId }, { dataSources }) {
      return dataSources.easyCargoAPI.getShipments(shipmentId);
    },
  },
};
