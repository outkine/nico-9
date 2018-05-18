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
          query($id: ID!, $userid: ID!) {
            project(id: $id) {
              id
              claps
              funVotes
              techVotes
              designVotes
              polishVotes
              creativityVotes
            }
            user(id: $userid) {
              id
              funVote {
                id
              }
              techVote {
                id
              }
              designVote {
                id
              }
              polishVote {
                id
              }
              creativityVote {
                id
              }
            }
          }
        `}
        variables={{
          id: this.props.project.id,
          userid: window.localStorage.getItem('id'),
        }}
      >
        {({ data: { project, user } }) => (
          <div styleName="project">
            <p>{this.props.project.description}</p>
            <div className="seperator" />
            <div className="row">
              <button>download files</button>
              {['creativity', 'design', 'polish', 'fun', 'tech'].map((category) => (
                <Vote
                  disabled={user[category + 'Vote']?.id === project.id}
                  key={category}
                  project={project}
                  category={category}
                />
              ))}
              <Vote project={project} clap />
            </div>
          </div>
        )}
      </Query>
    )
  }
}
