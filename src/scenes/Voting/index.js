import React from 'react'
import gql from 'graphql-tag'

import { Query } from 'components'
import Project from './Project'
import './index.scss'

const voteSort = (b, a) =>
  a.funVotes +
  a.techVotes +
  a.designVotes +
  a.polishVotes +
  a.creativityVotes -
  (b.funVotes + b.techVotes + b.designVotes + b.polishVotes + b.creativityVotes)

const categorySort = (category) => (b, a) => a[category] - b[category]

export default class Voting extends React.Component {
  state = {
    category: '',
    activeProject: '',
  }

  render() {
    return (
      <div>
        <div styleName="toolbar" className="row">
          <div styleName="nested-toolbar" className="row">
            <p>sort:</p>
            <div styleName="categories" className="row">
              <p
                onClick={() => this.setState({ category: '' })}
                style={
                  !this.state.category
                    ? {
                        background: '#E85A5A',
                      }
                    : {}
                }
              >
                all
              </p>
              {['creativity', 'design', 'polish', 'fun', 'tech'].map((category) => (
                <img
                  key={category}
                  src={`assets/${category}${this.state.category === category ? '-color' : ''}.svg`}
                  onClick={() => this.setState({ category })}
                />
              ))}
            </div>
            <p>votes left:</p>
            <div styleName="categories" className="row">
              <Query
                query={gql`
                query {
                  user(id: "${window.localStorage.getItem('id')}") {
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
              >
                {({ data: { user } }) => {
                  const votesLeft = ['creativity', 'design', 'polish', 'fun', 'tech'].filter(
                    (category) => !user[category + 'Vote'],
                  )
                  if (votesLeft.length === 0) {
                    return <p>none</p>
                  } else {
                    return votesLeft.map((category) => (
                      <img key={category} src={`assets/${category}.svg`} />
                    ))
                  }
                }}
              </Query>
            </div>
          </div>
          <img
            styleName="home"
            onClick={() => this.props.history.push('/')}
            src="assets/home.svg"
          />
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
                funVotes
                techVotes
                designVotes
                polishVotes
                creativityVotes
              }
            }
          `}
        >
          {({ data: { projects } }) => {
            return projects.length === 0 ? (
              <p>no projects yet!</p>
            ) : (
              projects
                .slice()
                .sort(!this.state.category ? voteSort : categorySort(this.state.category + 'Votes'))
                .map((project, i) => (
                  <div styleName="project" key={project.id}>
                    <div
                      styleName="title"
                      className="row"
                      onClick={() => this.setState({ activeProject: project.id })}
                    >
                      <p>{i + 1}</p>
                      <p className="highlight color1">{project.title}</p>
                      <p>by</p>
                      <p className="highlight color2">{project.author.username}</p>
                    </div>
                    {this.state.activeProject === project.id && <Project project={project} />}
                  </div>
                ))
            )
          }}
        </Query>
      </div>
    )
  }
}
