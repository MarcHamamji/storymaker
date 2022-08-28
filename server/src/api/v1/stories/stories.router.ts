import { randomUUID } from "crypto";
import { Router } from "express";
import zod from 'zod';

import StoryModel from "./stories.model";
import UserModel from "../users/users.model";
import requestValidator from "../../../utils/RequestValidator";
import StorySchema from "./stories.schema";

const router = Router();

router.get('/', async (req, res) => {
  const stories = await StoryModel.query()
    .where('user_id', req.userJWT!.id)
    .orderBy('updated_at', 'DESC');

  res.json({ stories });
});

router.get('/:id', requestValidator({
  params: zod.object({
    id: zod.string().uuid(),
  }),
}), async (req, res, next) => {
  try {
    const story = await StoryModel.query()
      .where('user_id', req.userJWT!.id)
      .where('id', req.params.id)
      .first();

    if (!story) {
      res.status(404);
      next(new Error('Story not found'));
    }

    res.json({ story });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requestValidator({
  params: zod.object({
    id: zod.string().uuid(),
  }),
  body: StorySchema,
}), async (req, res, next) => {
  try {
    const updated = await StoryModel.query()
      .where('user_id', req.userJWT!.id)
      .where('id', req.params.id)
      .first()
      .patch({
        flow: req.body.flow,
      })
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
    const user = await UserModel.query().findById(req.userJWT!.id);
    const inserted = await user?.$relatedQuery('story').insert({
      id: randomUUID(),
      flow: {
        "drawflow": {
          "Home": {
            "data": {
            }
          }
        }
      },
      name: req.body.name,
      user_id: req.userJWT!.id,
    });
    res.json({ story: inserted });

  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requestValidator({
  params: zod.object({
    id: zod.string().uuid(),
  }),
}), async (req, res, next) => {
  try {
    await UserModel.relatedQuery('story')
      .for(req.userJWT!.id)
      .deleteById(req.params.id);
    res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
});

export default router;
