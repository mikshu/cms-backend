const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
  _id: ID!
  email: String!
  userName: String
}
input UserInput {
  userName: String
  email: String!
  password: String!
}

input UserLogin {
  email: String!
  password: String!
}

type RootQuery {
  getUsers: [User!]!
}
type authData {
  userId : String
  email : String
  token: String
  tokenExpiration: Int
}


type RootMutation {
  createUser(userInput: UserInput): User
  login(userLogin: UserLogin) : authData!
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);
