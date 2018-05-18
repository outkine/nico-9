import React from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'

import './Vote.scss'

export default withApollo(({ category, clap, project, client }) => {
  const result = clap ? 'claps' : category + 'Votes'
  if (clap) category = 'clap'

  return (
    <button
      styleName="main"
      className="row"
      onClick={() =>
        client.mutate({
          ...(clap
            ? {
                mutation: gql`
                mutation($id: ID!) {
                  clap(id: $id) {
                    id
                    ${result}
                  }
                }
              `,
                variables: {
                  id: project.id,
                },
              }
            : {
                mutation: gql`
                mutation($id: ID!, $category: Category!) {
                  vote(id: $id, category: $category) {
                    id
                    ${result}
                  }
                }
              `,
                variables: {
                  id: project.id,
                  category,
                },
              }),
          optimisticResponse: {
            __typename: 'Mutation',
            [clap ? 'clap' : 'vote']: {
              id: project.id,
              __typename: 'Project',
              [result]: project[result] + 1,
            },
          },
        })
      }
    >
      <img src={`assets/${category}.svg`} />
      <p>{project[result]}</p>
    </button>
  )
})
