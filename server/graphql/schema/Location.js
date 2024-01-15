const types = `
  type Location {
    id: ID!
    city: String!
    address: String!
  }
`;

const inputs = `
  input LocationInput {
    id: String!
    city: String!
    address: String!
  }
`;

const querise = `
  location(location_id: Int!): Location
  locations: [Location]
`;

const mutations = `
  addLocation(city: String!, address: String!): Location
  removeLocation(location_id: String!): Location
  updateLocation(locations: [LocationInput]): Boolean
`;

module.exports = { types, inputs, querise, mutations };
