const error = (error, req, res, next) => {
  const { rescode } = error

  res.status(rescode || 500).json({ error: getErrorMessage(error) })
}

const getErrorMessage = error => {
  const { rescode, message } = error

  switch (rescode) {
    case 500:
      return message || 'Internal server error occurred.'
    default:
      return message || 'Something went wrong.'
  }
}

module.exports = error
