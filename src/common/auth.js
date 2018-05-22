import { get, cors } from 'common/request'
import gql from 'graphql-tag'

import { HOME_URI, LOGIN_URI, SIGNUP_URI } from 'Routes'
import { DEV_FRONT, PROD_FRONT } from 'App'

const CLIENT_ID = '[[GOOGLE CLIENT ID]]'

const REDIRECT =
  process.env.NODE_ENV === 'development'
    ? DEV_FRONT + '/oauth2callback'
    : PROD_FRONT + '/oauth2callback'

export function login() {
  cors('GET', 'https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/userinfo.email',
  })
}

export async function validate(token) {
  const auth = await get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    access_token: token,
  })
  if (auth.aud !== CLIENT_ID) {
    history.replace(LOGIN_URI)
    return
  }

  window.localStorage.setItem('token', token)
  window.localStorage.setItem('exp', auth.exp)
  window.localStorage.setItem('id', auth.sub)

  const { data } = await client.query({
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
        mutation($input: createUserInput!) {
          createUser(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: { username: auth.email.split('@')[0] },
      },
    })
    history.replace(SIGNUP_URI)
  }
}

export function logout() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('exp')
  history.push(LOGIN_URI)
}

export function isAuthenticated() {
  return Date.now() < parseInt(window.localStorage.getItem('exp')) * 1000
}
