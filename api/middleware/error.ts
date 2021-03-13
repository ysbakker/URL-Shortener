import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'
import debug from 'debug'
const log = debug('log')

const error = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { status, message, details } = error

  log(`${status} ${message}${details ? details + '\n' : ''}`)

  return res.status(status || 500).json({ error: message })
}

export default error
