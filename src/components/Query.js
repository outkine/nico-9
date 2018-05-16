import React from 'react'
import { Query } from 'react-apollo'

export default ({ children, ...other }) => (
  <Query {...other}>
    {(data) => {
      if (data.loading) {
        return <p>loading...</p>
      } else if (data.error) {
        return children({ ...data, error: data.error.graphQLErrors[0].message })
      } else {
        return children(data)
      }
    }}
  </Query>
)
