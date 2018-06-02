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
            this.width = el.offsetWidth
          }
        }}
      >
        <img
          src="assets/marker.svg"
          styleName="lever"
          onMouseDown={(event) => {
            this.dragging = true
            window.dragging = true
            this.dragStart = event.pageX
          }}
          style={{
            position: 'relative',
            left: this.state.distance,
          }}
        />
        <div styleName="bar" />
        <div styleName="edge left" />
        <div styleName="edge right" />
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
        this.props.update((this.width - 40) / newDistance)
      }
    })
    window.addEventListener('mouseup', () => {
      this.dragging = false
      window.dragging = false
    })
  }
}
