import { get } from 'common/request'
import { client } from 'App'
import { history } from 'index'
import gql from 'graphql-tag'

import * as firebase from 'firebase'
import { HOME_URI, LOGIN_URI, SIGNUP_URI } from '../Routes'

const provider = new firebase.auth.GoogleAuthProvider()

const CLIENT_ID = '810541216828-u6mqqjil5i6l3eii11gelm4u4dmn46g2.apps.googleusercontent.com'

export async function login() {
  const {
    credential: { accessToken },
  } = await firebase.auth().signInWithPopup(provider)

  const auth = await get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    access_token: accessToken,
  })
  if (auth.aud !== CLIENT_ID) {
    history.replace()
  }
  window.localStorage.setItem('token', accessToken)
  window.localStorage.setItem('exp', auth.exp)
  window.localStorage.setItem('id', auth.sub)

  const data = await client.query({
    query: gql`
      query($id: ID!) {
        user(id: $id) {
          id
        }
      }
    `,
    variables: { id: auth.sub },
  })

  if (data.user) {
    history.replace(HOME_URI)
  } else {
    await client.mutate({
      mutation: gql`
        mutation($id: ID!, $input: createUserInput!) {
          createUser(id: $id, input: $input) {
            writeTime
          }
        }
      `,
      variables: {
        id: auth.sub,
        input: { email: auth.email, username: auth.email.split('@')[0] },
      },
    })
    history.replace(SIGNUP_URI)
  }
}
window.login = login

export function logout() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('exp')
  window.localStorage.removeItem('id')
  history.push(LOGIN_URI)
}
window.logout = logout

export function isAuthenticated() {
  return Date.now() < parseInt(window.localStorage.getItem('exp')) * 1000
}
window.isAuthenticated = isAuthenticated
