import { Router } from 'express'

const router = Router()
import debug from 'debug'
import { getSlugData, getSlugByUrl, createSlug } from '../data/slugs'
import { isUrl } from '../../common/util'
import { Slug } from '../../common/types'
import createHttpError from 'http-errors'
const log = debug('log')

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params

  try {
    return res.json(await getSlugData(slug))
  } catch (e) {
    return next(e)
  }
})

router.post('/', async (req, res, next) => {
  const { url } = req.body
  if (!url) return next(createHttpError(400, 'No URL specified'))
  if (!isUrl(url)) return next(createHttpError(400, 'Invalid URL specified'))

  try {
    const slug = await getSlugByUrl(url)
    if (slug) return res.status(200).json(slug)

    return res.status(201).json(await createSlug(url))
  } catch (e) {
    return next(e)
  }
})

export default router
