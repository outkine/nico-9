import React from 'react'
import gql from 'graphql-tag'

import { Mutation } from 'components'
import { HOME_URI } from 'Routes'

export default class Signup extends React.Component {
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation($input: updateUserInput!) {
            updateUser(input: $input) {
              id
            }
          }
        `}
        onCompleted={() => this.props.history.push(HOME_URI)}
      >
        {(updateUser, { error }) => (
          <div>
            <div className="row">
              <input placeholder="username" ref={(el) => (this.username = el)} />
              <input placeholder="bio" ref={(el) => (this.bio = el)} />
              <button
                onClick={() => {
                  updateUser({
                    variables: {
                      input: { username: this.username.value, bio: this.bio.value },
                    },
                  })
                }}
              >
                sign up
              </button>
            </div>
            {error && <p className="error">Error: {error}</p>}
          </div>
        )}
      </Mutation>
    )
  }
}
