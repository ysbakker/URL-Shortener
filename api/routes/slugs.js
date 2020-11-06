const express = require('express')
const router = express.Router()
const ogscraper = require('open-graph-scraper')
const ogparser = require('../util/parse_og')
const log = require('debug')('log')

router.get('/', async (req, res) => {
  res.json([{ slug: 'asdf', url: 'https://www.yorrick.dev' }])
})

router.get('/:slug', async (req, res, next) => {
  const { url } = req.params

  res.redirect(301, `https://${url}`)
})

module.exports = router
