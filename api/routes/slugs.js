const express = require('express')
const router = express.Router()
const log = require('debug')('log')
const slugs = require('../model/slugs')

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params
  const result = await slugs.getSlugData(slug)

  if (!result) return res.status(404).send()

  res.json(result.Item)
})

module.exports = router
