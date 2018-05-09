import React from 'react'
import { login } from 'common/auth'
import { Button } from 'components'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Button onClick={login}>Log in!</Button>
      </div>
    )
  }
}
