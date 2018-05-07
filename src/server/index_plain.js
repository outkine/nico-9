import path from 'path'
import express from 'express'
import React from 'react'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { graphqlExpress } from 'apollo-server-express'
import secrets from './client_secret'
import schema from './schema'
import serviceAccount from './secret-key'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://event0-portal.firebaseio.com',
})
const db = admin.firestore()

const app = express()
app.post('/graphql', bodyParser.json(), async (req, res, next) => {
  return graphqlExpress({
    context: { ...req.context, db },
    schema,
  })(req, res, next)
})
app.listen(3000, () => console.log('Listening on http://localhost:3000'))
