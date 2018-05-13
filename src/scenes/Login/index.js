import React from 'react'
import { login } from 'common/auth'

import { Badge } from 'components'

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <Badge />
        <button onClick={login}>Log in!</button>
      </div>
    )
  }
}
