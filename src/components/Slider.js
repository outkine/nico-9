import React, { Component } from 'react'
// import './Slider.scss'

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
          style={{ width: '10px', background: 'black' }}
          onMouseDown={(event) => {
            window.dragging = true
          }}
        />
        {this.props.children[1]}
      </div>
    )
  }

  initializeDistance = (ref) => {
    if (!ref) return
    c(ref.getClientRects())
    this.setState({
      distance: ref.getClientRects()[0][this.props.direction === 'horizontal' ? 'width' : 'height'],
    })
  }

  componentDidMount() {
    window.addEventListener('mousemove', () => {
      if (window.dragging) {
        this.setState({ distance: event.clientX })
      }
    })
    window.addEventListener('mouseup', () => {
      window.dragging = false
    })
  }
}
