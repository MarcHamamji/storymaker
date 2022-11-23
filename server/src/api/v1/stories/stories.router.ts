// import { randomUUID } from 'crypto';
import { Router } from 'express';
import zod from 'zod';

import requestValidator, { IDParamValidator } from '../../../utils/RequestValidator';
import db from '../../../db';
import { StoryPublicData } from '../../../db/tables/Story';
import { randomUUID } from 'crypto';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const stories = await db.selectFrom('story').where('user_id', '=', req.userJWT!.id).selectAll().orderBy('updated_at', 'desc')
      .execute();
    res.json({ stories });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', IDParamValidator, async (req, res, next) => {
  try {
    const story = await db.selectFrom('story').where('user_id', '=', req.userJWT!.id).where('id', '=', req.params.id).selectAll()
      .executeTakeFirstOrThrow();
    res.json({ story });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', requestValidator({
  params: zod.object({
    id: zod.string().uuid(),
  }),
  body: StoryPublicData.partial(),
}), async (req, res, next) => {
  try {
    await db.updateTable('story').set({
      ...req.body,
    }).where('user_id', '=', req.userJWT!.id)
      .where('id', '=', req.params.id)
      .executeTakeFirstOrThrow();
    res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
});

router.post('/', requestValidator({
  body: zod.object({
    name: zod.string(),
  }),
}), async (req, res, next) => {
  try {
    const inserted = await db.insertInto('story').values({
      id: randomUUID(),
      flow: {
        drawflow: {
          Home: {
            data: {
            },
          },
        },
      },
      name: req.body.name,
      user_id: req.userJWT!.id,
    }).returningAll().executeTakeFirst();
    res.json({ story: inserted });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', IDParamValidator, async (req, res, next) => {
  try {
    await db.deleteFrom('story').where('user_id', '=', req.userJWT!.id).where('id', '=', req.params.id).executeTakeFirst();
    res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
});

export default router;
