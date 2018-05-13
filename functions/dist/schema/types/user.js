"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\ntype User {\n  id: ID!\n  email: String!\n  username: String!\n  bio: String\n}\n\ntype Query {\n  user(id: ID!): User\n  users: [User]!\n}\n\ninput createUserInput {\n  username: String!\n  email: String!\n}\n\ninput updateUserInput {\n  bio: String\n  username: String\n}\n\ntype Mutation {\n  createUser(id: ID!, input: createUserInput!): Result!\n  updateUser(id: ID!, input: updateUserInput!): Result!\n  deleteUser(id: ID!): Result!\n}\n";
exports.default = _default;