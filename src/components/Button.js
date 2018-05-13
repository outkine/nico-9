import React from 'react'
import './Button.scss'

export default ({ children, orientation }) => (
  <button styleName={'main ' + orientation}>{children}</button>
)
