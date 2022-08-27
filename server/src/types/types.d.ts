import { JwtPayload } from 'jsonwebtoken';

interface UserJWT extends JwtPayload {
  id: number;
}

declare global {
  namespace Express {
    export interface Request {
      userJWT?: UserJWT,
    }
  }
}
