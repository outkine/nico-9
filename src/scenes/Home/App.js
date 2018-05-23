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
        <button onClick={this.props.run}>run code</button>
        <div className="row">
          {['game', 'code', 'sprite'].map((view) => (
            <img
              key={view}
              src={`assets/${view}.svg`}
              onClick={() => this.props.changeView(view)}
            />
          ))}
        </div>
        <Component />
      </div>
    )
  }
}
