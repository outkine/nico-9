import React from 'react'
import { login } from 'common/auth'

export default class Home extends React.Component {
  render () {
    return <button onClick={login}>Log in!</button>
  }
}
