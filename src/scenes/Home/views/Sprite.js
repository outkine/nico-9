import React from 'react'

const PIXEL_SIZE = 10

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
      const left = el.offsetLeft
      const top = el.offsetTop
      const ctx = el.getContext('2d')
      ctx.fillStyle = 'black'
      el.addEventListener('mousemove', (event) => {
        if (this.mouseDown) {
          let x = Math.floor((event.pageX - left) / PIXEL_SIZE) * PIXEL_SIZE
          let y = Math.floor((event.pageY - top) / PIXEL_SIZE) * PIXEL_SIZE
          ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE)
        }
      })
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', () => (this.mouseDown = true))
    window.addEventListener('mouseup', () => (this.mouseDown = false))
  }
}
