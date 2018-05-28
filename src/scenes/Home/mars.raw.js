/* global load, update, draw, ctx, spriteCtx, CANVAS_SIZE_, GRID_SIZE_, GRID_NUMBER_, SCALE_ */
/* eslint no-unused-vars: 0 */

if (typeof draw !== 'function') throw new Error('You must define a "draw" function.')

const UPDATE_WAIT = 3

function rect(x, y, width, height, outline = false, color = null) {
  ctx.rect(x, y, width, height)
  if (outline) {
    ctx.stroke()
  } else {
    ctx.fill()
  }
}

const sprites = []

function sprite(i, x, y) {
  if (!sprites[i]) {
    sprites[i] = spriteCtx.getImageData(
      (i % GRID_NUMBER_) * SCALE_,
      Math.floor(i / GRID_NUMBER_) * SCALE_,
      GRID_SIZE_ * SCALE_,
      GRID_SIZE_ * SCALE_,
    )
  }
  ctx.putImageData(sprites[i], x, y)
}

if (typeof load === 'function') load()

function main() {
  if (typeof update === 'function') update()
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  draw()
  if (!window.stop) window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
