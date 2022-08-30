/* eslint-disable no-continue */
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
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (key in validationObject) {
      const validator = validationObject[key];
      if (!validator) continue;
      try {
        // eslint-disable-next-line no-await-in-loop
        req[key] = (await validator.parseAsync(req[key])) as zod.infer<typeof validator>;
      } catch (error) {
        if (error instanceof zod.ZodError) {
          res.status(400);
          next(new Error(error.issues.map((i) => i.message).join(' - ')));
        }
      }
    }
    next();
  };
}

export const IDParamValidator = requestValidator({
  params: zod.object({
    id: zod.string().uuid(),
  }),
});
