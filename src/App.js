import React from 'react'
import { Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'

import Routes from './Routes'
import './styles/index.scss'

export const history = createHistory()

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
  <Router history={history}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Router>
)
