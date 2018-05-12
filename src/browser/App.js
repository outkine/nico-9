import React from 'react'
import Routes from './Routes'
import * as firebase from 'firebase'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './styles/index.scss'

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
    // console.error(networkError?.result)
    // eslint-disable-next-line
    networkError?.result?.errors?.forEach((err) => console.error(err.message))
  },
})

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
