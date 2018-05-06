import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const root = document.createElement('div');
//$FlowFixMe
document.body.appendChild(root)

const renderHot = Component =>
  hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>
    , root
  )

renderHot(App)

//$FlowFixMe
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    renderHot(NextApp)
  })
}
