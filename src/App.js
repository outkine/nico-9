import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import * as scenes from './scenes'

const App = () =>
  <BrowserRouter>
    <Switch>
      <Route path='/' component={scenes.Home} />
    </Switch>
  </BrowserRouter>


export default hot(module)(App)
