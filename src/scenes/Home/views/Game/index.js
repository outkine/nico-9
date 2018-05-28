import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { SCALE, getCtx, CANVAS_SIZE, GRID_SIZE, GRID_NUMBER } from '../../store'

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
      /* eslint-disable no-unused-vars */

      const ctx = el.getContext('2d')

      const { canvas } = getCtx(this.props.spritesheet)
      const spriteCtx = document.createElement('canvas').getContext('2d')
      spriteCtx.imageSmoothingEnabled = false
      spriteCtx.scale(SCALE, SCALE)
      spriteCtx.drawImage(canvas, 0, 0)

      let GRID_NUMBER_ = GRID_NUMBER
      let GRID_SIZE_ = GRID_SIZE
      let CANVAS_SIZE_ = CANVAS_SIZE
      let SCALE_ = SCALE

      window.stop = false
      try {
        // eslint-disable-next-line
        eval(this.props.compiledCode)
      } catch (e) {
        this.setState({ error: e.message })
      }
    }
  }

  componentWillUnmount() {
    window.stop = true
  }
}
