import React from 'react'
import serverless from 'serverless-http'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

const app = express()

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const config = require('../../webpack.config.browser')
  const compiler = webpack(config)
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
    })
  )
  app.use(require('webpack-hot-middleware')(compiler))
  // app.use(express.static(path.resolve('../src/browser')));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
}

function render (html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>event0 portal</title>
      </head>

      <body>
        <div id="app"></div>
        ${html}
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}

app.get('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const App = require('../browser/App.js').default
      let context = {}
      res.send(
        render(
          renderToString(
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          )
        )
      )
    } catch (e) {
      console.log(e)
    }
  } else {
    res.send(render(''))
  }
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
})

export const handler = serverless(app)
if (process.env.NODE_ENV === 'development') {
  app.listen(3000, () => console.log('Listening on http://localhost:3000'))
}
