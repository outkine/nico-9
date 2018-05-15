import { get, cors } from 'common/request'
import { client, history } from 'App'
import gql from 'graphql-tag'

import { HOME_URI, LOGIN_URI, SIGNUP_URI } from 'Routes'

const CLIENT_ID = '810541216828-u6mqqjil5i6l3eii11gelm4u4dmn46g2.apps.googleusercontent.com'
console.log(process.env.NODE_ENV)
const REDIRECT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/oauth2callback'
    : 'https://portal.event0.org/oauth2callback'
console.log(REDIRECT)
const DOMAINS = ['cps.edu']
const OTHER_EMAILS = ['antonoutkine@gmail.com']

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

  if (!DOMAINS.includes(auth.email.split('@')[1]) && !OTHER_EMAILS.includes(auth.email)) {
    window.error = 'Make sure to use your cps email.'
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
  history.push(LOGIN_URI)
}

export function isAuthenticated() {
  return Date.now() < parseInt(window.localStorage.getItem('exp')) * 1000
}
