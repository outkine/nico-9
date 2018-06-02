import React, { Component } from 'react'
import './Slider.scss'

export default class Slider extends Component {
  state = {
    distance: '100%',
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: this.props.direction,
        }}
      >
        <div
          style={{
            flexBasis: this.state.distance,
          }}
          ref={this.initializeDistance}
        >
          {this.props.children[0]}
        </div>
        <div
          styleName="divider"
          onMouseDown={(event) => {
            window.dragging = true
            this.dragging = true
          }}
        />
        <div style={{ flex: 1 }}>{this.props.children[1]}</div>
      </div>
    )
  }

  initializeDistance = (ref) => {
    if (!ref) return
    this.setState({
      distance: ref.getClientRects()[0][this.props.direction === 'horizontal' ? 'width' : 'height'],
    })
  }

  componentDidMount() {
    window.addEventListener('mousemove', () => {
      if (this.dragging) {
        this.setState({ distance: event.clientX })
      }
    })
    window.addEventListener('mouseup', () => {
      this.dragging = false
      window.dragging = false
    })
  }
}
