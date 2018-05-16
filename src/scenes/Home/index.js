import React from 'react'
import { logout } from 'common/auth'
import { Badge, Center } from 'components'

export default class Home extends React.Component {
  render() {
    return (
      <Center>
        <Badge />
        <button onClick={() => this.props.history.push('/voting')}>vote</button>
        <button onClick={() => this.props.history.push('/new-project')}>create project</button>
        <button onClick={logout}>logout</button>
      </Center>
    )
  }
}
