import React from 'react'
import gql from 'graphql-tag'

import { Query } from 'components'
import Project from './Project'
import './index.scss'

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
              <div styleName="project" key={project.id}>
                <div className="row" onClick={() => this.setState({ activeProject: project.id })}>
                  <p>{i + 1}</p>
                  <p className="highlight color1">{project.title}</p>
                  <p>by</p>
                  <p className="highlight color2">{project.author.username}</p>
                </div>
                {this.state.activeProject === project.id && <Project project={project} />}
              </div>
            ))
          }
        </Query>
      </div>
    )
  }
}
