import debug from 'debug'
import random from 'crypto-random-string'
import Filter from 'bad-words'
import createHttpError from 'http-errors'
const filter = new Filter()
const log = debug('error')

export const generateSlug = (length: number): string => {
  const maxIterations = 10000

  let slug = random({ length, type: 'alphanumeric' })
  let iterations = 0

  while (filter.isProfane(slug) && iterations < maxIterations) {
    console.log(`Regenerating slug: ${slug}`)
    slug = random({ length, type: 'alphanumeric' })
    iterations++
  }

  if (iterations >= maxIterations) {
    log('Slug generation exceeded iteration limit')
    throw createHttpError(500, 'Slug generation failed')
  }

  return slug
}
