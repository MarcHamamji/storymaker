import { Router } from 'express';
import db from '../../../db';
import { IDParamValidator } from '../../../utils/RequestValidator';

const router = Router();

router.get('/:id', IDParamValidator, async (req, res, next) => {
  try {
    const story = await db.selectFrom('story').where('id', '=', req.params.id).selectAll().executeTakeFirstOrThrow();
    res.json({ story });
  } catch (error) {
    next(error);
  }
});

export default router;
