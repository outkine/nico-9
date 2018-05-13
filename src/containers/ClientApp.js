import React from 'react'
import { hydrate, render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import App from './App'

export const history = createHistory()

let render_ = process.env.NODE_ENV === 'production' ? hydrate : render

const renderHot = (Component) =>
  render_(
    <AppContainer>
      <Router history={history}>
        <Component />
      </Router>
    </AppContainer>,
    document.getElementById('app')
  )

renderHot(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    renderHot(NextApp)
  })
}
