import { get, cors } from 'common/request'

const CLIENT_ID =
  '810541216828-u6mqqjil5i6l3eii11gelm4u4dmn46g2.apps.googleusercontent.com'
const REDIRECT = 'http://localhost:8080/oauth2callback'

export function login () {
  cors('GET', 'https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  })
}

export async function validate (
  token,
  failRedirect,
  existRedirect,
  newRedirect
) {
  const auth = await get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
    access_token: token
  })
  if (auth.aud !== CLIENT_ID) {
    history.replace(failRedirect)
  }
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('exp', auth.exp)
  window.localStorage.setItem('_id', auth.sub)

  const { data } = await client.query({
    query: gql`
      query($id: ID!) {
        user(id: $id) {
          _id
        }
      }
    `,
    variables: { id: auth.sub }
  })

  if (data.user) {
    history.replace(existRedirect)
  } else {
    await client.mutate({
      mutation: gql`
        mutation CreateUser($input: createUserInput!) {
          createUser(input: $input) {
            _id
          }
        }
      `,
      variables: { input: { username: auth.email.split('@')[0] } }
    })

    history.replace(newRedirects)
  }
}

export function logout () {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('exp')
  window.localStorage.removeItem('_id')
  history.push('/')
}

export function isAuthenticated () {
  return Date.now() < parseInt(window.localStorage.getItem('exp')) * 1000
}
