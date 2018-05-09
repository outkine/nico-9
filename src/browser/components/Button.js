import React from 'react'
import './Button.scss'

export default ({ children, type, ...other }) => (
  <button {...other}>{children}</button>
)
