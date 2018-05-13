import React from 'react'
import Routes from './Routes'
import 'isomorphic-fetch'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import '../styles/index.scss'

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  request: async (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
  },
  onError: ({ networkError }) => {
    // eslint-disable-next-line
    networkError?.result?.errors?.forEach((err) => console.error(err.message))
    // eslint-disable-next-line
    networkError?.result?.error && console.log(networkError.result.error)
  },
})

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
