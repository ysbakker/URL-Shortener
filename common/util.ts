export const stripUrl = (inputUrl: string): any => {
  const pattern = /^https?:\/\//
  if (!pattern.test(inputUrl)) inputUrl = `http://${inputUrl}`
  const url = new URL(inputUrl)

  url.pathname += url.pathname.endsWith('/') ? '' : '/'
  const protocol = url.protocol

  return { url: url.href.replace(pattern, ''), https: protocol === 'https:' }
}

export const isUrl = (url: string): boolean =>
  /(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&//=]*/.test(
    url
  )
