import React from 'react'
import { Query } from 'components'
import gql from 'graphql-tag'

export default class Project extends React.Component {
  state = { expanded: false }

  render() {
    return (
      <div onClick={() => this.setState({ expanded: true })}>
        <p>{this.props.project.title}</p>

        {this.state.expanded && (
          <Query
            query={gql`
              query($id: ID!) {
                project(id: $id) {
                  description
                }
              }
            `}
            variables={{
              id: this.props.project.id,
            }}
          >
            {({ data: { project } }) => <p>{project.description}</p>}
          </Query>
        )}
      </div>
    )
  }
}
