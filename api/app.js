const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const serverless = require('serverless-http')

const urlRouter = require('./routes/url')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/url', urlRouter)

module.exports = app
module.exports.handler = serverless(app)
