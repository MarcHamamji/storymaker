import { Request, Response, NextFunction} from 'express';
import { AnyZodObject } from 'zod';

interface ValidationObject {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

export default function requestValidator(validationObject: ValidationObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let key: keyof ValidationObject;
    for (key in validationObject) {
      const validator = validationObject[key];
      if(!validator) continue;
      try {
        req[key] = await validator.parseAsync(req[key]);
      } catch (error) {
        res.status(400);
        next(error);
      }
    }
    next();
  };
}
