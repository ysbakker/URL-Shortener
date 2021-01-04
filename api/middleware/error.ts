import { Request, Response, NextFunction } from 'express'

const error = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { rescode } = error

  res.status(rescode || 500).json({ error: getErrorMessage(error) })
}

const getErrorMessage = (error: any) => {
  const { rescode, message } = error

  switch (rescode) {
    case 500:
      return message || 'Internal server error occurred.'
    default:
      return message || 'Something went wrong.'
  }
}

export default error
