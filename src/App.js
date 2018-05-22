import React from 'react'
import { Router } from 'react-router-dom'
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'

import Routes from './Routes'
import './styles/index.global.scss'

export const history = createHistory()

// export const DEV_SERVER = 'http://localhost:3000'
// export const PROD_SERVER = 'https://[[SERVER URL]]'
// export const DEV_FRONT = 'http://localhost:8080'
// export const PROD_FRONT = 'https://[[NETLIFY URL]]'

// export const client = new ApolloClient({
//   uri: process.env.NODE_ENV === 'development' ? DEV_SERVER + '/graphql' : PROD_SERVER + '/graphql',
//   request: async (operation) => {
//     const token = localStorage.getItem('token')
//     operation.setContext({
//       headers: {
//         Authorization: token ? `Bearer ${token}` : null,
//         'Access-Control-Allow-Origin': '*',
//       },
//     })
//   },
//   onError: ({ networkError, graphQLErrors }) => {
//     // eslint-disable-next-line
//     networkError?.result?.errors?.forEach((err) => console.error(err.message))
//     // eslint-disable-next-line
//     networkError?.result?.error && console.error(networkError.result.error)
//     // eslint-disable-next-line
//     graphQLErrors?.forEach((err) => console.error(err.message))
//   },
// })

export default () => (
  <Router history={history}>
    {/* <ApolloProvider client={client}> */}
    <Routes />
    {/* </ApolloProvider> */}
  </Router>
)
