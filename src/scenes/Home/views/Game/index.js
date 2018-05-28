import React from 'react'
import { connect } from 'react-redux'

@connect(({ compiledCode }) => ({ compiledCode }))
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
      console.log(this.props.code)
      // eslint-disable-next-line
      const ctx = el.getContext('2d')
      try {
        // eslint-disable-next-line
        eval(this.props.compiledCode)
      } catch (e) {
        this.setState({ error: e.message })
      }
    }
  }
}
