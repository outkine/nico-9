import React from 'react'
import gql from 'graphql-tag'

import { Mutation } from 'components'
import { HOME_URI } from 'Routes'

export default class NewProject extends React.Component {
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation($input: createProjectInput!) {
            createProject(input: $input) {
              id
            }
          }
        `}
        onCompleted={() => this.props.history.push(HOME_URI)}
      >
        {(createProject, { error }) => (
          <div>
            <input placeholder="title" ref={(el) => (this.title = el)} />
            <input placeholder="description" ref={(el) => (this.description = el)} />
            <button
              onClick={() =>
                createProject({
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
    )
  }
}
