import React from 'react'
import { Query } from 'react-apollo'

export default ({ children, ...other }) => (
  <Query {...other}>
    {(data) => {
      if (data.loading) {
        return <p>loading...</p>
      } else if (data.error) {
        // throw new Error(data.error.message)
        // if (data.error.graphQLErrors?.[0]) {
        //   return children({ ...data, error: data.error.graphQLErrors[0].message })
        // }
      } else {
        console.log(data)
        return children(data)
      }
    }}
  </Query>
)
