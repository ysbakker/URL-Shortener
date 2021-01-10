import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

const error = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { status, message } = error

  return res.status(status || 500).json({ error: message })
}

export default error
