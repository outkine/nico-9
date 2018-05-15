import React from 'react'

export default ({ children, className, ...other }) => (
  <div className={'vertical-center ' + className} {...other}>
    <div className="center">{children}</div>
  </div>
)
