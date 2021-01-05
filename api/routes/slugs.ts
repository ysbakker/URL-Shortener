import { Router } from 'express'

const router = Router()
import debug from 'debug'
import { getSlugData, getSlugByURL, createSlug } from '../data/slugs'
import { isUrl } from '../util/'
const log = debug('log')

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params

  let result
  try {
    result = await getSlugData(slug)
  } catch (e) {
    return next({ rescode: 500, message: 'Slug data provider error occurred.' })
  }

  if (!result) return next({ rescode: 404, message: 'Slug does not exist!' })

  return res.json(result)
})

router.post('/', async (req, res, next) => {
  const { url } = req.body
  if (!url) return next({ rescode: 400, message: 'No url specified' })
  if (!isUrl(url))
    return next({ rescode: 400, message: 'Specified url is invalid' })

  try {
    const slug = await getSlugByURL(url)
    if (slug) return res.status(200).json(slug)

    return res.status(201).json(await createSlug(url))
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

export default router
