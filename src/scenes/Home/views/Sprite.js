import React from 'react'
import { connect } from 'react-redux'

import { CANVAS_SIZE } from '../store'

const SCALE = 4

@connect(
  ({ spritesheet }) => ({ spritesheet }),
  (dispatch) => ({
    changeSpritesheet: (payload) =>
      dispatch({
        type: 'CHANGE_SPRITESHEET',
        payload,
      }),
  }),
)
export default class Sprite extends React.Component {
  mouseDown = false

  render() {
    return (
      <div>
        <canvas ref={this.init} />
      </div>
    )
  }

  init = (el) => {
    if (el) {
      this.el = el
      el.width = CANVAS_SIZE * SCALE
      el.height = CANVAS_SIZE * SCALE
      this.ctx = el.getContext('2d')
      this.ctx.imageSmoothingEnabled = false
      this.ctx.scale(SCALE, SCALE)
      el.addEventListener('mousemove', (event) => this.mouseDown && this.onChange(event))
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', () => (this.mouseDown = true))
    window.addEventListener('mouseup', () => (this.mouseDown = false))
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas = () => {
    let canvas = document.createElement('canvas')
    let imageData = this.ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE)
    imageData.data.set(this.props.spritesheet)
    canvas.getContext('2d').putImageData(imageData, 0, 0)
    this.ctx.clearRect(0, 0, CANVAS_SIZE * SCALE, CANVAS_SIZE * SCALE)
    this.ctx.drawImage(canvas, 0, 0)
  }

  onChange = (event) => {
    this.ctx.fillStyle = 'rgb(0, 0, 0)'
    let x = Math.floor((event.pageX - this.el.offsetLeft) / SCALE)
    let y = Math.floor((event.pageY - this.el.offsetTop) / SCALE)
    this.ctx.fillRect(x, y, 1, 1)
    this.props.changeSpritesheet({ x, y, r: 0, g: 0, b: 0 })
  }
}
