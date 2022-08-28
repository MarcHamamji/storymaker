import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { UserJWT } from '../../../types/types';
import config from '../../../utils/config';

export function setUser(req: Request, _res: Response, next: NextFunction) {
  const jwt = req.get('authorization');
  if (!jwt) {
    next();
    return;
  }
  const decoded = jsonwebtoken.verify(jwt as string, config.JWT_SECRET as string);
  req.userJWT = decoded as UserJWT;
  next();
}

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.userJWT) {
    return next();
  }
  res.status(401);
  return next(new Error("Un-Authorized"));
}
