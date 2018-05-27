import React from 'react'
import { connect } from 'react-redux'

import * as views from './views'

@connect(
  ({ view }) => ({ view }),
  (dispatch) => ({
    run: () => dispatch({ type: 'RUN' }),
    changeView: (view) =>
      dispatch({
        type: 'CHANGE_VIEW',
        payload: { view },
      }),
  }),
)
export default class Home extends React.Component {
  render() {
    // eslint-disable-next-line
    const Component = views[this.props.view]
    return (
      <div style={{ height: '100%' }}>
        <div className="row">
          <button onClick={this.props.run}>run code</button>
          {['game', 'code', 'sprite'].map((view) => (
            <button onClick={() => this.props.changeView(view)} key={view}>
              <img src={`assets/${view}.svg`} />
            </button>
          ))}
        </div>
        <Component />
      </div>
    )
  }
}
