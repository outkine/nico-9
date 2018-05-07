export default `
type User {
  id: ID!
  email: String!
  username: String!
  bio: String
}

type Query {
  user(id: ID!): User
  users: [User]!
}

input createUserInput {
  username: String!
  email: String!
}

input updateUserInput {
  bio: String
  username: String
}

type Mutation {
  createUser(id: ID!, input: createUserInput!): Result!
  updateUser(id: ID!, input: updateUserInput!): Result!
  deleteUser(id: ID!): Result!
}
`
