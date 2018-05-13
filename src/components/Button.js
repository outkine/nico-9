import React from 'react'
import './Button.scss'

export default ({ children, type, ...other }) => (
  <button styleName={type} {...other}>
    {children}
  </button>
)
