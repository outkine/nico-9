import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const root = document.createElement('div');
//$FlowFixMe
document.body.appendChild(root)

const renderHot = Component =>
  render(
    <AppContainer>
      <Component />
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
