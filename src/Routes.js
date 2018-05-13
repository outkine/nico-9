import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { isAuthenticated, validate } from 'common/auth'
import * as scenes from 'scenes'

export const LOGIN_URI = '/login'
export const HOME_URI = '/'
export const SIGNUP_URI = '/signup'

const routes = [
  {
    path: LOGIN_URI,
    component: scenes.Login,
    authenticated: false,
  },
  {
    path: SIGNUP_URI,
    component: scenes.Create,
    authenticated: true,
  },
  {
    path: HOME_URI,
    component: scenes.Home,
    authenticated: true,
  },
]

function protectedRoute(Component, authenticated) {
  return (props) => {
    const auth = isAuthenticated()
    if ((authenticated && auth) || (!authenticated && !auth)) {
      return <Component {...props} />
    } else {
      if (props.staticContext) {
        props.staticContext.status = 302
      }
      console.log('redirecting to' + authenticated ? 'login' : 'home')
      return <Redirect to={authenticated ? LOGIN_URI : HOME_URI} />
    }
  }
}

export default () => (
  <Switch>
    <Route
      path="/oauth2callback"
      render={(props) => {
        const params = new URLSearchParams(props.location.hash.substr(1))
        validate(params.get('access_token'))
        return <p>loading...</p>
      }}
    />
    {routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          render={protectedRoute(route.component, route.authenticated)}
        />
      )
    })}
  </Switch>
)
