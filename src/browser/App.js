import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { Provider, Client } from 'urql'

import * as scenes from './scenes'

// const client = new Client({
//   url: 'http://localhost:3001/graphql',
// })

export default () => (
  <Switch>
    <Route path="/" component={scenes.Home} />
  </Switch>
)
