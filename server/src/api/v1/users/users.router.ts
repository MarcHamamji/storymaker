import { Router } from 'express';
import db from '../../../db';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await db.selectFrom('user').where('id', '=', req.userJWT!.id).selectAll().executeTakeFirst();
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
