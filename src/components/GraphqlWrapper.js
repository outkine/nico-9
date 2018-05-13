import React from 'react'

export default ({ children, data }) => {
  if (data.loading) {
    return <p>loading...</p>
  } else if (data.error) {
    return <p>Error: {data.error}</p>
  }
  return children
}
