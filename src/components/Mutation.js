import React from 'react'
import { Mutation } from 'react-apollo'

export default ({ children, ...other }) => (
  <Mutation {...other}>
    {(mutate, data) => {
      if (data.loading) {
        return <p>loading...</p>
      } else if (data.error) {
        return children(mutate, { ...data, error: data.error.graphQLErrors[0].message })
      } else {
        return children(mutate, data)
      }
    }}
  </Mutation>
)
