import { Request, Response, NextFunction } from 'express';
import zod from 'zod';

interface ValidationObject {
  body?: zod.AnyZodObject;
  params?: zod.AnyZodObject;
  query?: zod.AnyZodObject;
}

export default function requestValidator(validationObject: ValidationObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let key: keyof ValidationObject;
    for (key in validationObject) {
      const validator = validationObject[key];
      if (!validator) continue;
      try {
        req[key] = await validator.parseAsync(req[key]);
      } catch (error) {
        if (error instanceof zod.ZodError) {
          res.status(400);
          next(new Error(error.issues.map(i => i.message).join(' - ')))
        }
      }
    }
    next();
  };
}
