const random = require('crypto-random-string')
const Filter = require('bad-words')
const filter = new Filter()

const generateSlug = length => {
  const maxIterations = 10000

  let slug = random({ length, type: 'alphanumeric' })
  let iterations = 0

  while (filter.isProfane(slug) && iterations < maxIterations) {
    console.log(`Regenerating slug: ${slug}`)
    slug = random({ length, type: 'alphanumeric' })
    iterations++
  }

  if (iterations >= maxIterations) {
    const error = new Error(
      `Slug generator exceeded ${maxIterations} iterations.`
    )
    error.code = 'SLUG_GENERATOR_ERROR'
    console.error(error)
    throw error
  }

  return slug
}

module.exports = generateSlug
