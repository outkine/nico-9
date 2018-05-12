import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default class Create extends React.Component {
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation($id: ID!, $input: updateUserInput!) {
            updateUser(id: $id, input: $input) {
              writeTime
            }
          }
        `}
        variables={{
          id: window.localStorage.getItem('id'),
          input: { username: this.username.value, bio: this.bio.value },
        }}
      >
        {(updateUser) => (
          <div>
            <input ref={(el) => (this.username = el)} />
            <input ref={(el) => (this.bio = el)} />
            <button onClick={updateUser}>sign up</button>
          </div>
        )}
      </Mutation>
    )
  }
}
