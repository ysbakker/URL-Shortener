const express = require('express')
const router = express.Router()
const log = require('debug')('log')
const slugs = require('../model/slugs')

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params
  let result
  try {
    result = await slugs.getSlugData(slug)
  } catch (e) {
    return next({ rescode: 500, message: 'Slug data provider error occurred.' })
  }

  if (!result) return next({ rescode: 404, message: 'Slug does not exist!' })

  res.json(result)
})

router.post('/', async (req, res, next) => {
  const { url } = req.body

  try {
    const slug = await slugs.getSlugByURL(url)
    if (slug) return res.json(slug)
  } catch (e) {
    return next({ rescode: 500, message: 'Slug data provider error occurred.' })
  }

  res.json(url)
})

module.exports = router
