import React from 'react'

export default class Game extends React.Component {
  render() {
    return <canvas ref={this.init} />
  }

  init = (el) => {
    // eslint-disable-next-line
    const ctx = el.getContext('2d')
    // eslint-disable-next-line
    console.log(this.props.code)
    eval(this.props.code)
  }
}
