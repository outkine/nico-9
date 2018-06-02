import React from 'react'

import { COLORS } from '../../store'
import './ColorPicker.scss'

export default ({ tool }) => (
  <div styleName="main">
    {[...new Array(4).keys()].map((x) => (
      <div className="row" key={x}>
        {[...new Array(4).keys()].map((y) => (
          <div key={y} styleName="color" style={{ background: Object.values(COLORS)[x * 4 + y] }} />
        ))}
      </div>
    ))}
  </div>
)
