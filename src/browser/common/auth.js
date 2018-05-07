import { get, cors } from 'common/request'
import { client } from 'App'
import { mutation, query } from 'urql'
import { history } from 'index'

import * as firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

const CLIENT_ID =
  '810541216828-u6mqqjil5i6l3eii11gelm4u4dmn46g2.apps.googleusercontent.com'
const REDIRECT = 'http://localhost:8080/oauth2callback'
const FAIL_REDIRECT = '/login'
const EXIST_REDIRECT = '/'
const NEW_REDIRECT = '/create'

export async function login () {
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

  const { data, error } = await client.executeQuery(
    query(
      `
      query($id: ID!) {
        user(id: $id) {
          id
        }
      }
    `,
      { id: auth.sub }
    )
  )

  console.log(error)
  if (error) throw new Error(error)

  console.log(auth)
  if (data.user) {
    history.replace(EXIST_REDIRECT)
  } else {
    await client.executeMutation(
      mutation(
        `
        mutation($id: ID!, $input: createUserInput!) {
          createUser(id: $id, input: $input) {
            writeTime
          }
        }
      `,
        {
          id: auth.sub,
          input: { email: auth.email, username: auth.email.split('@')[0] },
        }
      )
    )
    history.replace(NEW_REDIRECT)
  }
}

export function logout () {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('exp')
  window.localStorage.removeItem('id')
  history.push(FAIL_REDIRECT)
}
window.logout = logout
// TODO: remove

export function isAuthenticated () {
  return Date.now() < parseInt(window.localStorage.getItem('exp')) * 1000
}
