import React from 'react'
import { Switch, Route } from 'react-router-dom'

import * as scenes from './scenes'

export default () =>
  <Switch>
    <Route path='/' component={scenes.Home} />
  </Switch>
