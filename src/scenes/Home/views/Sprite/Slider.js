import React from 'react'

import './Slider.scss'

export default class Slider extends React.Component {
  state = {
    distance: 0,
  }
  dragging = false

  render() {
    return (
      <div
        styleName="main"
        ref={(el) => {
          if (el) {
            // debugger
            this.width = el.offsetWidth
          }
        }}
      >
        <div styleName="bar" />
        <div styleName="edge left" />
        <div styleName="edge right" />
        <div
          styleName="lever"
          onMouseDown={(event) => {
            this.dragging = true
            this.dragStart = event.pageX
          }}
          style={{
            // transform: `translateX(${this.state.distance})`,
            position: 'relative',
            left: this.state.distance,
          }}
        />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('mousemove', (event) => {
      if (this.dragging) {
        let newDistance = this.state.distance + (event.pageX - this.dragStart)
        if (newDistance < 0) newDistance = 0
        else if (newDistance > this.width - 40) newDistance = this.width - 40
        this.setState({ distance: newDistance })
        this.dragStart = event.pageX
      }
    })
    window.addEventListener('mouseup', () => {
      this.dragging = false
    })
  }
}
