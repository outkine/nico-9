import boilerplate from './boilerplate'

const boiler = boilerplate('user')

export default {
  Query: {
    ...boiler.Query,
  },
  Mutation: {
    ...boiler.Mutation,
  },
}
