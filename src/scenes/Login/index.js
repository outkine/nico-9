import React from 'react'
import { login } from 'common/auth'

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <button onClick={login}>Log in!</button>
      </div>
    )
  }
}
