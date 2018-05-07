import { makeExecutableSchema } from 'graphql-tools'
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import * as types from './types'
import * as resolvers from './resolvers'

export default makeExecutableSchema({
  typeDefs: mergeTypes(Object.values(types)),
  resolvers: mergeResolvers(Object.values(resolvers)),
})
