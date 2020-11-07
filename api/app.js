const AWS = require('aws-sdk')
AWS.config = new AWS.Config({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  region: process.env.AWS_REGION,
})

const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('debug')('http')
const error = require('./middleware/error')
const serverless = require('serverless-http')
const app = express()

const slugsRouter = require('./routes/slugs')

app.use(morgan('dev', { stream: { write: msg => logger(msg) } }))
app.use(express.json())
app.use(cookieParser())

app.use('/slugs', slugsRouter)

app.use(error)

module.exports = app
module.exports.handler = serverless(app)
