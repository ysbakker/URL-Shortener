"use strict";
var AWS = require('aws-sdk');
var express = require('express');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('debug')('http');
var serverless = require('serverless-http');
var error = require('./middleware/error');
AWS.config = new AWS.Config({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
    },
    region: process.env.AWS_REGION,
});
var app = express();
var slugsRouter = require('./routes/slugs');
app.use(morgan('dev', { stream: { write: function (msg) { return logger(msg); } } }));
app.use(express.json());
app.use(cookieParser());
app.use('/slugs', slugsRouter);
app.use(error);
module.exports = app;
module.exports.handler = serverless(app);
