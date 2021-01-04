const stripURL = (inputUrl: string): any => {
  const pattern = /^https?:\/\//
  if (!pattern.test(inputUrl)) inputUrl = `http://${inputUrl}`
  const url = new URL(inputUrl)

  url.pathname += url.pathname.endsWith('/') ? '' : '/'
  const protocol = url.protocol

  return { url: url.href.replace(pattern, ''), https: protocol === 'https:' }
}

export default stripURL
