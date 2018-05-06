import express from 'express'
import cors from 'cors'
import path from 'path'
import webpack from 'webpack'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
// import App from '../browser'

const app = express()

// app.use(cors())

if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.config.browser')
  const compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
  }))
  app.use(require('webpack-hot-middleware')(compiler))
  // app.use(express.static(path.resolve('../src/browser')));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
}

function render(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>event0 portal</title>
      </head>

      <body>
        <div id="app"></div>
        ${html}
      </body>
    </html>
  `
}

app.get('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    let context = {}
    res.send(render(renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )))
  } else {
    res.send(render(
      '<script src="bundle.js"></script>'
    ))
  }
})

app.listen(3000, () => {
  console.log('Server is listening on port: 3000')
})
