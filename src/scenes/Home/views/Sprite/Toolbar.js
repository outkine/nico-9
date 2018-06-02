import React from 'react'

import ColorPicker from './ColorPicker'
import Slider from './Slider'

export default ({ tool }) => {
  switch (tool) {
    case 'pencil':
      return (
        <div>
          <ColorPicker />
          <Slider />
        </div>
      )
    case 'eraser':
      return (
        <div>
          <Slider />
        </div>
      )
  }
}
