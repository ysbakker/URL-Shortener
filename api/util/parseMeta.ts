const parse = (tags: any): string => {
  let result = '<html><head>'
  result = result.concat(meta('title', tags.ogTitle))
  result = result.concat(meta('type', tags.ogType))

  if (tags.ogImage) {
    result = result.concat(meta('image', tags.ogImage.url))
    result = result.concat(meta('image:type', tags.ogImage.type))
    result = result.concat(meta('image:width', tags.ogImage.width))
    result = result.concat(meta('image:height', tags.ogImage.height))
  }
  result = result.concat(meta('url', tags.ogUrl))
  result = result.concat(meta('description', tags.ogDescription))
  result = result.concat(meta('site_name', tags.ogSiteName))
  result = result.concat(meta('locale', tags.ogLocale))

  result = result.concat(
    '</head><body><p>This is a metadata placeholder page that should only be seen by scrapers.</p></body></html>'
  )
  return result
}

const meta = (prop: string, content: string): string =>
  content ? `<meta property="og:${prop}" content="${content}" />` : ''

export default parse
