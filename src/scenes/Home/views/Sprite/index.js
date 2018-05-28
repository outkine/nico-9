import React from 'react'
import { connect } from 'react-redux'

import { CANVAS_SIZE, GRID_SIZE, GRID_NUMBER } from '../../store'
import './index.scss'

const SCALE = 10

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
      <div styleName="main">
        <canvas ref={this.initMain} />
        <canvas ref={this.initGrid} />
        <canvas ref={this.initOverlay} />
      </div>
    )
  }

  init = (el) => {
    if (el) {
      this.main = el
      el.width = CANVAS_SIZE * SCALE
      el.height = CANVAS_SIZE * SCALE
    }
  }
  initMain = (el) => {
    this.init(el)
    this.main = el
    this.mainCtx = el.getContext('2d')
    this.mainCtx.imageSmoothingEnabled = false
    this.mainCtx.scale(SCALE, SCALE)
  }
  initGrid = (el) => {
    if (el) {
      this.init(el)
      let ctx = el.getContext('2d')
      ctx.beginPath()
      ctx.strokeStyle = 'black'
      let begin, end
      for (let x = 0; x <= GRID_NUMBER; x++) {
        begin = [x * GRID_SIZE * SCALE, 0]
        end = [x * GRID_SIZE * SCALE, CANVAS_SIZE * SCALE]
        // console.log('begin', begin, 'end', end)
        ctx.moveTo(begin[0], begin[1])
        ctx.lineTo(end[0], end[1])
      }
      for (let y = 0; y <= GRID_NUMBER; y++) {
        begin = [0, y * GRID_SIZE * SCALE]
        end = [CANVAS_SIZE * SCALE, y * GRID_SIZE * SCALE]
        ctx.moveTo(begin[0], begin[1])
        ctx.lineTo(end[0], end[1])
      }
      ctx.stroke()
    }
  }
  initOverlay = (el) => {
    if (el) {
      this.init(el)
      let ctx = el.getContext('2d')
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
    let imageData = this.mainCtx.createImageData(CANVAS_SIZE, CANVAS_SIZE)
    imageData.data.set(this.props.spritesheet)
    canvas.getContext('2d').putImageData(imageData, 0, 0)
    this.mainCtx.clearRect(0, 0, CANVAS_SIZE * SCALE, CANVAS_SIZE * SCALE)
    this.mainCtx.drawImage(canvas, 0, 0)
  }

  onChange = (event) => {
    this.mainCtx.fillStyle = 'rgb(0, 0, 0)'
    let x = Math.floor((event.pageX - this.main.offsetLeft) / SCALE)
    let y = Math.floor((event.pageY - this.main.offsetTop) / SCALE)
    this.props.changeSpritesheet({ x, y, r: 0, g: 0, b: 0 })
    this.mainCtx.fillRect(x, y, 1, 1)
  }
}
