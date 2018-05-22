import React from 'react'
import * as views from './views'

export default class Home extends React.Component {
  state = {
    currentView: 'code',
    code: '',
  }

  render() {
    switch (this.state.currentView) {
      case 'code':
        return <views.Code run={this.run} />
      case 'game':
        return <views.Game code={this.state.code} />
    }
  }

  run = (code) => {
    this.setState({ currentView: 'game', code })
  }
}
