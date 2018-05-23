import { createStore } from 'redux'
import coffee from 'coffeescript'

import mars from './mars.raw'

function prepareCode(code) {
  return `
  ${code}
  ${mars}
  `
}

export default createStore(
  (state = { code: '', error: '', view: 'code', compiledCode: '' }, action) => {
    switch (action.type) {
      case 'CHANGE_CODE': {
        const { payload } = action
        return {
          ...state,
          code:
            state.code.slice(0, payload.start) +
            payload.text +
            state.code.slice(payload.start + payload.deleteLength),
        }
      }
      case 'RUN': {
        try {
          const code = coffee.compile(state.code, { bare: true })
          return { ...state, view: 'game', compiledCode: prepareCode(code) }
        } catch (error) {
          console.dir(error)
          return { ...state, view: 'code', error: { ...error } }
        }
      }
      case 'CHANGE_VIEW': {
        return { ...state, view: action.payload.view }
      }
      default:
        return state
    }
  },
)
