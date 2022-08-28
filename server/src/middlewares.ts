// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';
import config from './utils/config';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: config.NODE_ENV === 'production' ? '' : err.stack,
  });
}
