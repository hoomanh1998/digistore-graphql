const types = `
  type AuthPayload {
    accessToken: String!
    expiresAt: Int!
    verificationURL: String
    user: User
  }
  type ResetPasswordPayLoad {
    resetPasswordURL: String!
  }
`;

const inputs = null;

const querise = null;

const mutations = `
  registerUser(
    firstName: String
    lastName: String
    email: String!
    password: String! 
  ): AuthPayload!
  loginUser(email: String!, password: String!): AuthPayload!
  verifyUser(token: String!): Boolean
  forgotPassword(email: String!): ResetPasswordPayLoad
  resetPassword(
    password: String!
    confirmPassword: String!
    token: String
  ): Boolean
`;

module.exports = { types, inputs, querise, mutations };
