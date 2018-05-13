import { get, cors } from 'common/request'
import { client } from 'containers/App'
import gql from 'graphql-tag'

import { HOME_URI, LOGIN_URI, SIGNUP_URI } from 'containers/Routes'

let history
if (process.env.__isBrowser__) {
  history = import('containers/ClientApp').history
}

const CLIENT_ID = '810541216828-u6mqqjil5i6l3eii11gelm4u4dmn46g2.apps.googleusercontent.com'
const REDIRECT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/oauth2callback'
    : 'https://portal.event0.org/oauth2callback'

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
  }
  window.localStorage.setItem('token', token)
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

export function logout() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('exp')
  window.localStorage.removeItem('id')
  history.push(LOGIN_URI)
}

export function isAuthenticated() {
  if (process.env.__isBrowser__) {
    return false
  }
  return Date.now() < parseInt(window.localStorage.getItem('exp')) * 1000
}
