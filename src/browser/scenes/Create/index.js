import React from 'react'
import { ConnectHOC, mutation } from 'urql'

@ConnectHOC({
  mutation: {
    updateUser: mutation(`
      mutation($input: updateUserInput!) {
        updateUser(input: $input) {
          writeTime
        }
      }
    `),
  },
})
export default class Home extends React.Component {
  render () {
    console.log(this.props.error, this.props.error?.response)
    console.dir(this.props.error)
    return (
      <div>
        <input ref={el => (this.username = el)} />
        <input ref={el => (this.bio = el)} />
        <button
          onClick={() =>
            this.props.updateUser({
              id: window.localStorage.getItem('id'),
              input: { username: this.username.value, bio: this.bio.value },
            })
          }
        >
          sign up
        </button>
      </div>
    )
  }
}
