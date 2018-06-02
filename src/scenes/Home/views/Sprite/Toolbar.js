import React from 'react'

import ColorPicker from './ColorPicker'
import Slider from './Slider'

export default ({ tool, update }) => {
  switch (tool) {
    case 'pencil':
      return (
        <div>
          <ColorPicker update={(color) => update({ color })} />
          <Slider update={(width) => update({ width })} />
        </div>
      )
    case 'eraser':
      return (
        <div>
          <Slider update={(width) => update({ width })} />
        </div>
      )
  }
}
