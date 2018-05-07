import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from 'common/auth'
import * as scenes from './scenes'

function ProtectedRoute ({ authenticated = true, ...props }) {
  const auth = isAuthenticated()
  if ((authenticated && auth) || (!authenticated && !auth)) {
    return <Route {...props} />
  } else {
    return <Redirect to="/login" />
  }
}

export default () => (
  <Switch>
    <Route path="/login" component={scenes.Login} />
    <ProtectedRoute path="/create" component={scenes.Create} />
    <ProtectedRoute path="/" component={scenes.Home} />
  </Switch>
)
