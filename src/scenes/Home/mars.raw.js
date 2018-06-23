/* global load, update, draw, ctx, spriteCtx, CANVAS_SIZE_, GRID_SIZE_, GRID_NUMBER_, SCALE_ */
/* eslint no-unused-vars: 0 */

if (typeof draw !== 'function') throw new Error('You must define a "draw" function.')

const UPDATE_WAIT = 3

// public api
function rect(x, y, width, height, outline = false, color = 'black') {
  ctx.rect(x, y, width, height)
  
  ctx.strokeStyle = color
  ctx.fillStyle = color
  
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

function line(x0, y0, x1, y1, color = 'black') {
  ctx.strokeStyle = color
  
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
  ctx.closePath()
}

function ellipse(x, y, radiusx, radiusy, outline = false, color = 'black') {
  ctx.strokeStyle = color
  ctx.fillStyle = color
  
  ctx.ellipse(x, y, radiusx, radiusy, 0, 0, 2 * Math.PI)
  if (outline) {
    ctx.stroke()
  } else {
    ctx.fill()
  }
}

function point(x, y, size = 5, color = 'black') {
  ellipse(x, y, size, size, color)  
}

function cls() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

if (typeof load === 'function') load()

function main() {
  if (typeof update === 'function') update()
  draw()
  if (!window.stop) window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
