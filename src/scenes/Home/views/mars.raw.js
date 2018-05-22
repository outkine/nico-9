/* global load, update, draw, ctx */
/* eslint no-unused-vars: 0 */

if (typeof draw !== 'function') throw new Error('You must define a "draw" function.')

const UPDATE_WAIT = 33

function rect(x, y, width, height, outline = false) {
  ctx.rect(x, y, width, height)
  if (outline) {
    ctx.stroke()
  } else {
    ctx.fill()
  }
}

if (typeof load === 'function') load()

let currentTime = 0
function main(timestamp) {
  let frameTime = timestamp - currentTime

  if (frameTime >= UPDATE_WAIT) {
    currentTime = timestamp
    let accumulator = frameTime

    while (accumulator >= UPDATE_WAIT) {
      if (typeof update === 'function') update()
      accumulator -= UPDATE_WAIT
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    draw()
  }
  window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
