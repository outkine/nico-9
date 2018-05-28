import { createStore } from 'redux'
import coffee from 'coffeescript'

import mars from './mars.raw'

function prepareCode(code) {
  return `
  ${code}
  ${mars}
  `
}

export const GRID_SIZE = 8
export const GRID_NUMBER = 10
export const CANVAS_SIZE = GRID_SIZE * GRID_NUMBER

// function getImageDataIndices(x, y) {
//   const red = (y * CANVAS_SIZE + x) * 4
//   return [red, red + 1, red + 2, red + 3]
// }

export default createStore(
  (
    state = {
      code: '',
      error: '',
      view: 'sprite',
      compiledCode: '',
      spritesheet: new Array(CANVAS_SIZE ** 2 * 4),
    },
    action,
  ) => {
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
      case 'CHANGE_SPRITESHEET': {
        // const { payload } = action

        // let spritesheet = state.spritesheet.slice()
        // const [r, g, b, a] = getImageDataIndices(payload.x, payload.y)
        // spritesheet[r] = payload.r
        // spritesheet[g] = payload.g
        // spritesheet[b] = payload.b
        // spritesheet[a] = 255

        return {
          ...state,
          // spritesheet,
        }
      }
      case 'UPDATE_IMAGEDATA': {
        return {
          ...state,
          spritesheet: action.payload,
        }
      }
      case 'RUN': {
        try {
          const code = coffee.compile(state.code, { bare: true })
          return { ...state, view: 'game', compiledCode: prepareCode(code) }
        } catch (error) {
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
