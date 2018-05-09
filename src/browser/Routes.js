import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from 'common/auth'
import * as scenes from './scenes'

export const LOGIN_URI = '/login'
export const HOME_URI = '/'
export const SIGNUP_URI = '/signup'

function ProtectedRoute ({ authenticated = true, ...props }) {
  const auth = isAuthenticated()
  if ((authenticated && auth) || (!authenticated && !auth)) {
    return <Route {...props} />
  } else {
    return <Redirect to={LOGIN_URI} />
  }
}

export default () => (
  <Switch>
    <Route path={LOGIN_URI} component={scenes.Login} />
    <ProtectedRoute path={SIGNUP_URI} component={scenes.Create} />
    <ProtectedRoute path={HOME_URI} component={scenes.Home} />
  </Switch>
)
