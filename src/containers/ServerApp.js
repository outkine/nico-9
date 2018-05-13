import React from 'react'
import { StaticRouter } from 'react-router'
import App from './App'

export default ({ url, context }) => (
  <StaticRouter location={url} context={context}>
    <App />
  </StaticRouter>
)
