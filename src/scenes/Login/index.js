import React from 'react'
import { login } from 'common/auth'

import { Center } from 'components'

export default class Login extends React.Component {
  render() {
    return (
      <Center className="outer">
        <button onClick={login} className="center">
          Log in!
        </button>
        {window.error && <p className="error">{window.error}</p>}
      </Center>
    )
  }
}
