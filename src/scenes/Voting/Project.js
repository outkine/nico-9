import React from 'react'
import { Query } from 'components'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'

@withApollo
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
            }
          }
        `}
        variables={{
          id: this.props.project.id,
        }}
      >
        {({ data: { project } }) => (
          <div>
            {this.props.project.description}
            <div className="seperator" />
            <div className="row">
              <button>download files</button>
              <button>votes</button>
              <button
                className="row"
                onClick={() =>
                  this.props.client.mutate({
                    mutation: gql`
                      mutation($id: ID!) {
                        clap(id: $id) {
                          id
                          claps
                        }
                      }
                    `,
                    variables: {
                      id: this.props.project.id,
                    },
                    optimisticResponse: {
                      __typename: 'Mutation',
                      clap: {
                        id: this.props.project.id,
                        __typename: 'Project',
                        claps: project.claps + 1,
                      },
                    },
                  })
                }
              >
                <img src="assets/clap.svg" />
                <p>{project.claps}</p>
              </button>
            </div>
          </div>
        )}
      </Query>
    )
  }
}
