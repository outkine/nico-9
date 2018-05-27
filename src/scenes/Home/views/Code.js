import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import { connect } from 'react-redux'
import * as monaco from 'monaco-editor'

@connect(
  ({ code, error, location }) => ({ code, error }),
  (dispatch) => ({
    changeCode: ({ changes: [e] }) =>
      dispatch({
        type: 'CHANGE_CODE',
        payload: { start: e.rangeOffset, deleteLength: e.rangeLength, text: e.text },
      }),
    run: () => dispatch({ type: 'RUN' }),
  }),
)
export default class Code extends React.Component {
  decorations = []
  state = {
    error: null,
    displayError: false,
  }
  onChange = (newCode, event) => {
    if (this.props.error) {
      this.decorations = this.editor.deltaDecorations(this.decorations, [])
    }
    this.props.changeCode(event)
  }
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.error) {
      this.error = nextProps.error
      const { error } = nextProps
      this.decorations = this.editor.deltaDecorations(this.decorations, [
        {
          range: new monaco.Range(
            error.location.first_line + 1,
            error.location.first_column + 1,
            error.location.last_line + 1,
            error.location.last_column + 2,
          ),
          options: { inlineClassName: 'error' },
        },
      ])
    }
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <MonacoEditor
          width="100%"
          height="100%"
          language="coffeescript"
          value={this.props.code}
          options={{
            selectOnLineNumbers: true,
            fontSize: 50,
          }}
          onChange={this.onChange}
          editorDidMount={(editor) => (this.editor = editor)}
        />
        {this.props.error && <p>{this.props.error.message}</p>}
      </div>
    )
  }
}
