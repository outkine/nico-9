import React from 'react'
import gql from 'graphql-tag'

import { Mutation, Query } from 'components'
import { HOME_URI } from 'Routes'

export default class EditProject extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          query {
            user(id: ${window.localStorage.getItem('id')}) {
              project {
                id
                title
                description
              }
            }
          }
        `}
      >
        {({ data: { user } }) => (
          <Mutation
            mutation={gql`
              mutation($input: updateProjectInput!) {
                updateProject(input: $input) {
                  id
                }
              }
            `}
            onCompleted={() => this.props.history.push(HOME_URI)}
            refetchQueries={[
              {
                query: gql`
                  query {
                    user(id: ${window.localStorage.getItem('id')}) {
                      project {
                        id
                        title
                        description
                      }
                    }
                  }
                `,
              },
            ]}
          >
            {(updateProject, { error }) => (
              <div>
                <input defaultValue={user.project.title} ref={(el) => (this.title = el)} />
                <input
                  defaultValue={user.project.description}
                  ref={(el) => (this.description = el)}
                />
                <button
                  onClick={() =>
                    updateProject({
                      variables: {
                        input: {
                          title: this.title.value,
                          description: this.description.value,
                        },
                      },
                    })
                  }
                >
                  done
                </button>
                {error && <p className="error">Error: {error}</p>}
              </div>
            )}
          </Mutation>
        )}
      </Query>
    )
  }
}
