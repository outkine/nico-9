import React from 'react'
import { render } from 'react-dom'

import App from './App'

const root = document.createElement('div');
//$FlowFixMe
document.body.appendChild(root)

render(<App />, root)
