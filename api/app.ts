import AWS from 'aws-sdk'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import serverless from 'serverless-http'
import debug from 'debug'
import cors from 'cors'
const logger = debug('http')

AWS.config = new AWS.Config({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  region: process.env.AWS_REGION,
})

const app = express()

import error from './middleware/error'
import slugsRouter from './routes/slugs'

app.use(cors({ origin: '*' }))
app.use(morgan('dev', { stream: { write: (msg: any) => logger(msg) } }))
app.use(express.json())
app.use(cookieParser())

app.use('/slugs', slugsRouter)

app.use(error)

module.exports = app
module.exports.handler = serverless(app)
