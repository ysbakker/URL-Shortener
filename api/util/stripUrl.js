const stripURL = inputUrl => {
  const pattern = /^https?:\/\//
  if (!pattern.test(inputUrl)) inputUrl = `http://${inputUrl}`
  let url = new URL(inputUrl)

  url.pathname += url.pathname.endsWith('/') ? '' : '/'
  protocol = url.protocol
  url = url.href.replace(pattern, '')

  return { url, https: protocol === 'https:' }
}

module.exports = stripURL
