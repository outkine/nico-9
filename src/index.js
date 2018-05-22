import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const renderHot = (Component) =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  )

renderHot(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    renderHot(NextApp)
  })
}
