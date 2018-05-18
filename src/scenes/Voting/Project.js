import React from 'react'
import { Query } from 'components'
import gql from 'graphql-tag'

import Vote from './Vote'
import './Project.scss'

export default class Project extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Query
        query={gql`
          query($id: ID!) {
            project(id: $id) {
              id
              claps
              funVotes
              techVotes
              designVotes
              polishVotes
              creativityVotes
            }
          }
        `}
        variables={{
          id: this.props.project.id,
        }}
      >
        {({ data: { project } }) => (
          <div styleName="project">
            <p>{this.props.project.description}</p>
            <div className="seperator" />
            <div className="row">
              <button>download files</button>
              <Vote project={project} category="creativity" />
              <Vote project={project} category="design" />
              <Vote project={project} category="fun" />
              <Vote project={project} category="tech" />
              <Vote project={project} category="polish" />
              <Vote project={project} clap />
            </div>
          </div>
        )}
      </Query>
    )
  }
}
