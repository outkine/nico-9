import React from 'react'
import { logout } from 'common/auth'
import { Badge, Center, Query } from 'components'
import gql from 'graphql-tag'

export default class Home extends React.Component {
  render() {
    return (
      <Query
        query={gql`
        query {
          user(id: ${window.localStorage.getItem('id')}) {
            project {
              id
            }
          }
        }
      `}
      >
        {({ data: { user } }) => (
          <Center>
            <Badge />
            <button onClick={() => this.props.history.push('/voting')}>vote</button>
            {user.project ? (
              <button onClick={() => this.props.history.push('/edit-project')}>edit project</button>
            ) : (
              <button onClick={() => this.props.history.push('/new-project')}>
                create project
              </button>
            )}
            <button
              onClick={() => (window.location.href = 'https://join.slack.com/t/chicode/signup')}
            >
              talk on slack
            </button>
            <button onClick={logout}>logout</button>
          </Center>
        )}
      </Query>
    )
  }
}
