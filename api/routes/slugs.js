const express = require('express')
const router = express.Router()
const log = require('debug')('log')
const slugs = require('../data/slugs')
const $ = require('../util/index')

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
  if (!url) return next({ rescode: 400, message: 'No url specified' })
  if (!$.isUrl(url))
    return next({ rescode: 400, message: 'Specified url is invalid' })

  try {
    let slug = await slugs.getSlugByURL(url)
    if (slug) return res.status(200).json(slug)

    return res.status(201).json(await slugs.createSlug(url))
  } catch (e) {
    return next({
      rescode: 500,
      message:
        e.code === 'SLUG_GENERATOR_ERROR'
          ? e.message
          : 'Slug data provider error occurred.',
    })
  }
})

module.exports = router
