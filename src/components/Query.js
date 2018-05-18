import React from 'react'
import { Query } from 'react-apollo'

export default ({ children, ...other }) => (
  <Query {...other}>
    {(data) => {
      console.log(data)
      if (data.loading) {
        return <p>loading...</p>
      } else {
        return children(data)
      }
    }}
  </Query>
)
