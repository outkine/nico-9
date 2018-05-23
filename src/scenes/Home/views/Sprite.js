import React from 'react'

export default class Sprite extends React.Component {
  render() {
    return (
      <div>
        <canvas ref={this.init} />
      </div>
    )
  }

  init = (el) => {
    this.el = el
    const left = el.offsetLeft
    const top = el.offsetTop
    const ctx = el.getContext('2d')
    el.addEventListener('click', (even) => {
      let x = event.pageX - left
      let y = event.pageY - top
      ctx.fillRect(x, y, 1, 1)
    })
  }

  componentWillUnmount() {
    this.el.removeEventListeners()
  }
}
