import React from 'react'
import { Provider, Client, query } from 'urql'
import Routes from './Routes'
import * as firebase from 'firebase'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'
// import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from 'react-apollo'

// import { InMemoryCache } from 'apollo-cache-inmemory'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCyAK_9E6glU2EOy5GzF0ayOxhqzvrvgIg',
    authDomain: 'event0-portal.firebaseapp.com',
    databaseURL: 'https://event0-portal.firebaseio.com',
    projectId: 'event0-portal',
    storageBucket: 'event0-portal.appspot.com',
    messagingSenderId: '810541216828',
  })
}

// export const client = new Client({
//   url: 'http://localhost:3000/graphql',
//   fetchOptions: () => {
//     const token = localStorage.getItem('token')
//     return {
//       headers: new Headers({
//         'Content-Type': 'application/json',
//         'Authorization': token ? `Bearer ${token}` : null,
//       }),
//     }
//   },
// })

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = createHttpLink({
  uri: 'http://0.0.0.0:3000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer a${token}` : null,
      'Content-Type': 'application/json',
    },
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      query($id: ID!) {
        user(id: $id) {
          id
        }
      }
    `,
    variables: { id: 10 },
  })
  .then(data => console.log(data))
  .catch(error => console.error(error))

// const aclient = new ApolloClient({
//   uri: 'http://0.0.0.0:3000/graphql',
//   defaultOptions: {
//     watchQuery: {
//       errorPolicy: 'none',
//     },
//     query: {
//       errorPolicy: 'none',
//     },
//     mutate: {
//       errorPolicy: 'none',
//     },
//   },
// })
// aclient
//   .query({
//     query: gql`
//       query($id: ID!) {
//         user(id: $id) {
//           _
//           id
//         }
//       }
//     `,
//   })
//   .then(result => console.log(result))
//   .catch(result => console.log(result))

export default () => (
  // <ApolloProvider client={aclient}>
  //   <Routes />
  // </ApolloProvider>
  <Provider client={client}>
    <Routes />
  </Provider>
)
