import express from 'express'
import React from 'react'
import cors from 'cors'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { graphqlExpress } from 'apollo-server-express'
import secrets from './client_secret'
import schema from './schema'
import fetch from 'node-fetch'
import serviceAccount from './secret-key'
import morgan from 'morgan'
import Koa from 'koa' // koa@2
import bodyParser from 'koa-bodyparser'
import { graphqlKoa } from 'apollo-server-koa'
import route from 'koa-route'
import path from 'path'
import kstatic from 'koa-static'

const logger = require('koa-logger')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://event0-portal.firebaseio.com',
})
const db = admin.firestore()

const app = new Koa()

app.use(logger())
app.use((ctx, next) => {
  ctx.request.header = {
    ...ctx.request.header,
    // 'host': 'localhost:3000',
    // 'user-agent': 'curl/7.59.0',
    // 'accept': 'application/json',
    // 'content-type': 'application/json',
    // 'authorization':
    //   'Bearer ya29.Gly2BUusUtOwqjads-KnV2U0idWZ7ALckIdlZntyA1Akh1ZQhqWORuF4HBInSXNoLU5Z5siltBWOWhkazUrhBGRJ3GbIUj1nX8dQAWJ7WZJS7gqSKTCDlldn9D3aew',
    // // 'content-length': '29',
  }
  return next()
})
app.use(bodyParser())

app.use(
  route.post('/graphql', async (ctx, next) => {
    ctx.body = ctx.request.body
    console.log(ctx.body)

    if (ctx.headers.authorization) {
      const token = ctx.headers.authorization.split(' ')[1]

      let id

      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token
      )
      if (response.status !== 200) {
        ctx.status = 401
        ctx.body = { error: 'Invalid token.' }
        return
      }
      const json = await response.json()
      if (
        json.error_description ||
        json.aud !== secrets.web.client_id ||
        Date.now() > json.exp * 1000
      ) {
        ctx.status = 401
        ctx.body = { error: 'Invalid token.' }
        return
      }
      id = json.sub
      // }

      const user = await db
        .collection('users')
        .doc(id)
        .get()
      if (!user.exists) {
        ctx.newUser = true
      }
    } else {
      ctx.status = 401
      ctx.body = { error: 'Invalid token.' }
      return

      // /// /////////////////// DEBUG ONLY
      // req.context.user = await mongo.Users.findOne({
      //   _id: '105342380724738854881',
      // })
      // req.context.newUser = '105342380724738854881'
      // /// //////////////////
    }

    console.log(1)
    console.log(ctx.body, ctx.request.body)
    return graphqlKoa({
      context: { db },
      schema,
    })(ctx, next)
  })
)

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const config = require('../../webpack.config.browser')
  const compiler = webpack(config)
  app.use(
    require('koa-webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: 'errors-only',
    })
  )
  app.use(require('koa-webpack-hot-middleware')(compiler))
  // app.use(express.static(path.resolve('../src/browser')));
} else if (process.env.NODE_ENV === 'production') {
  app.use(kstatic(path.resolve('public')))
}

function render (html) {
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

app.use(ctx => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const App = require('../browser/App.js').default
      let context = {}
      ctx.body = render(
        renderToString(
          <StaticRouter location={ctx.url} context={context}>
            <App />
          </StaticRouter>
        )
      )
    } catch (e) {
      console.log(e)
    }
  } else {
    ctx.body = render('')
  }
})

export const server = functions.https.onRequest(app)
app.listen(3000)
console.log('Koa listening on port http://localhost:3000')
