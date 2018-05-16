import React from 'react'
import gql from 'graphql-tag'

import { Query } from 'components'

export default class Voting extends React.Component {
  state = {
    activeProject: '',
  }

  render() {
    return (
      <div>
        <div className="row">
          <p>Votes left</p>
          <img onClick={() => this.props.history.push('/')} src="assets/home.svg" />
        </div>
        <Query
          query={gql`
            query {
              projects {
                id
                title
                description
                author {
                  username
                }
              }
            }
          `}
        >
          {({ data: { projects } }) =>
            projects.map((project, i) => (
              <div
                className="row"
                key={project.id}
                onClick={() => this.setState({ activeProject: project.id })}
              >
                <p>{i}</p>
                <p>{project.title}</p>
                <p>by</p>
                <p>{project.author.username}</p>
                {this.state.activeProject === project.id && <p>{project.description}</p>}
              </div>
            ))
          }
        </Query>
      </div>
    )
  }
}
