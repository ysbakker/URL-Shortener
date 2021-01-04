const isUrl = (url: string): boolean =>
  /(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&//=]*/.test(
    url
  )

export default isUrl
