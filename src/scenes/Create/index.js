import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GraphqlWrapper } from 'components'

import { HOME_URI } from 'Routes'

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
        onCompleted={() => this.props.history.push(HOME_URI)}
      >
        {(updateUser, data) => (
          <GraphqlWrapper data={data}>
            <input ref={(el) => (this.username = el)} />
            <input ref={(el) => (this.bio = el)} />
            <button
              onClick={() => {
                updateUser({
                  variables: {
                    id: window.localStorage.getItem('id'),
                    input: { username: this.username.value, bio: this.bio.value },
                  },
                })
              }}
            >
              sign up
            </button>
          </GraphqlWrapper>
        )}
      </Mutation>
    )
  }
}
