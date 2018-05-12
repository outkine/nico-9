import path from 'path'
import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import serviceAccount from './secret-firebase'
import googleSecret from './secret-google'
import testingSecret from './secret-testing'
import schema from './schema'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://event0-portal.firebaseio.com',
})
const db = admin.firestore()

const app = express()
app.use(morgan('tiny'))
app.use(cors())

app.post(
  '/graphql',
  bodyParser.json(),
  async (req, res, next) => {
    req.context = {}

    if (req.get('Authorization')) {
      const token = req.get('Authorization').split(' ')[1]

      let id

      if (token === testingSecret.token) {
        id = testingSecret.id
      } else {
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token
        )
        if (response.status !== 200) {
          res.status(401).json({ error: 'Invalid token.' })
          return
        }
        const json = await response.json()
        if (
          json.aud !== googleSecret.web.client_id ||
          Date.now() > json.exp * 1000 ||
          json.error_description
        ) {
          res.status(401).json({ error: 'Invalid token.' })
          return
        }
        id = json.sub
      }

      const user = await db
        .collection('users')
        .doc(id)
        .get()
      if (!user.exists) {
        req.context.newUser = true
      }
    } else {
      res.status(401).json({ error: 'Missing authorization header.' })
      return
    }

    next()
  },
  graphqlExpress((req) => ({
    context: { ...req.context, db },
    schema,
  }))
)
if (process.env.NODE_ENV === 'development') {
  app.get(
    '/graphiql',
    graphiqlExpress(() => ({
      passHeader: `'Authorization': 'Bearer ${testingSecret.token}'`,
    }))
  )
}

function render(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>event0 portal</title>
      </head>

      <body>
        <div id="app">${html}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const config = require('../../webpack.config.browser')
  const compiler = webpack(config)
  app.get(
    '*',
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: 'minimal',
    })
  )
  app.get('*', require('webpack-hot-middleware')(compiler))
} else if (process.env.NODE_ENV === 'production') {
  app.get('*', express.static(path.resolve('public')))
}

app.get('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const App = require('../browser/App.js').default
    let context = {}
    const content = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
    switch (context.status) {
      case 302:
        return res.redirect(302, context.url)
      case 404:
        return res.status(404)
    }
    res.send(render(content))
  } else {
    res.send(render(''))
  }
})

export const server = functions.https.onRequest(app)
if (process.env.NODE_ENV === 'development') {
  app.listen(3000, () => console.log('Listening on http://localhost:3000'))
}
