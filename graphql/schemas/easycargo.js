const { gql } = require("apollo-server-express");

module.exports = gql`
  type Shipment {
    id: ID!
    name: String!
    created: String!
    open_shipment_url: String!
    report_version: Int!
    report_id: ID
    report_url: String
    user_id: ID!
    cargospace_id: ID!
    public_url: String
    public_report_url: String
    is_archived: Boolean!
  }

  type Query {
    getShipments(shipmentId: ID): [Shipment]
  }
`;
