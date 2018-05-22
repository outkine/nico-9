import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import coffee from 'coffeescript'
import mars from './mars.raw'

function prepareCode(code) {
  return `
  ${code}
  ${mars}
  `
}

export default class Code extends React.Component {
  state = { code: '' }
  editorDidMount = (editor, monaco) => {
    editor.focus()
    this.monaco = monaco
  }
  onChange = (newValue) => {
    this.setState({ code: newValue })
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <button onClick={this.run}>click</button>
        <MonacoEditor
          width="100%"
          height="100%"
          language="coffeescript"
          value={this.state.code}
          options={{
            selectOnLineNumbers: true,
            fontSize: 50,
          }}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
  run = () => {
    this.props.run(prepareCode(coffee.compile(this.state.code, { bare: true })))
  }
}
