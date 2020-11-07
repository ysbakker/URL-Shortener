const stripUrl = url => {
  const https = /https:\/\//.test(url)

  url = url.replace(/^https?:\/\//, '')
  url = /^.*?\//.test(url)
    ? url.replace(/^.*?\//, url.match(/^.*?\//)[0].toLowerCase())
    : url.toLowerCase()

  return { url, https }
}

module.exports = stripUrl
