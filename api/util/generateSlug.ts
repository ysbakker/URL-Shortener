import random from 'crypto-random-string'
import { Exception } from '../types/exceptions'
import Filter from 'bad-words'
const filter = new Filter()

const generateSlug = (length: number): string => {
  const maxIterations = 10000

  let slug = random({ length, type: 'alphanumeric' })
  let iterations = 0

  while (filter.isProfane(slug) && iterations < maxIterations) {
    console.log(`Regenerating slug: ${slug}`)
    slug = random({ length, type: 'alphanumeric' })
    iterations++
  }

  if (iterations >= maxIterations) {
    const error = new Exception(
      `Slug generator exceeded ${maxIterations} iterations.`,
      'SLUG_GENERATOR_ERROR'
    )
    console.error(error)
    throw error
  }

  return slug
}

export default generateSlug
