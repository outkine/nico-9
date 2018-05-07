import React from 'react'
import { logout } from 'common/auth'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <button onClick={logout}>logout</button>
      </div>
    )
  }
}
