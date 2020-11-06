const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('debug')('http')
const serverless = require('serverless-http')

const slugsRouter = require('./routes/slugs')

const app = express()

app.use(morgan('dev', { stream: { write: msg => logger(msg) } }))
app.use(express.json())
app.use(cookieParser())

app.use('/slugs', slugsRouter)

module.exports = app
module.exports.handler = serverless(app)
