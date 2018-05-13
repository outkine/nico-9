import React from 'react'
import { login } from 'common/auth'

import { Badge, Button } from 'components'

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <Badge />
        <Button onClick={login} orientation="center">
          Log in!
        </Button>
      </div>
    )
  }
}
