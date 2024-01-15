const types = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    isVerified: Boolean
    locations: [Location]!
    orders: [Order]!
    cart: Cart!
    wishList: WishList!
  }
  type UserInfo {
    firstName: String!
    lastName: String!
    email: String!
  }
`;

const inputs = null;

const querise = `
  user(user_id: Int!): User
  users: [User]
  currentUser: User
`;

const mutations = `
  updateUserProfile(
    firstName: String!
    lastName: String!
    email: String!
  ): UserInfo
`;

module.exports = { types, inputs, querise, mutations };
