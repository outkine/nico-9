"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTools = require("graphql-tools");

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var types = _interopRequireWildcard(require("./types"));

var resolvers = _interopRequireWildcard(require("./resolvers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: (0, _mergeGraphqlSchemas.mergeTypes)(Object.values(types)),
  resolvers: (0, _mergeGraphqlSchemas.mergeResolvers)(Object.values(resolvers))
});

exports.default = _default;