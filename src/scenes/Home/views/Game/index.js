import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { CANVAS_SIZE, GRID_SIZE, GRID_NUMBER } from '../../store'

@connect(({ compiledCode, spritesheet }) => ({ compiledCode, spritesheet }))
export default class Game extends React.Component {
  state = {
    error: '',
  }
  render() {
    return (
      <div>
        <canvas ref={this.init} />
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }

  init = (el) => {
    if (el) {
      // eslint-disable-next-line
      const ctx = el.getContext('2d')
      // eslint-disable-next-line
      const spriteCtx = document.createElement('canvas').getContext('2d')
      let imageData = spriteCtx.createImageData(CANVAS_SIZE, CANVAS_SIZE)
      imageData.data.set(this.props.spritesheet)
      spriteCtx.putImageData(imageData, 0, 0)
      try {
        // eslint-disable-next-line
        eval(this.props.compiledCode)
      } catch (e) {
        this.setState({ error: e.message })
      }
    }
  }
}
