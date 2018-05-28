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
export const SCALE = 10

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

export function getCtx(data) {
  let imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE)
  imageData.data.set(data)
  ctx.putImageData(imageData, 0, 0)
  return { canvas, ctx }
}

export function handleSpritesheetAction(action, ctx) {
  switch (action.tool) {
    case 'pencil': {
      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.fillRect(action.x, action.y, 1, 1)
      break
    }

    case 'eraser': {
      ctx.clearRect(action.x, action.y, 1, 1)
      break
    }
  }
}

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
        // let spritesheet = state.spritesheet.slice()
        // const [r, g, b, a] = getImageDataIndices(payload.x, payload.y)
        // spritesheet[r] = payload.r
        // spritesheet[g] = payload.g
        // spritesheet[b] = payload.b
        // spritesheet[a] = 255

        const { ctx } = getCtx(state.spritesheet)

        handleSpritesheetAction(action.payload, ctx)

        return {
          ...state,
          spritesheet: ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE).data,
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
