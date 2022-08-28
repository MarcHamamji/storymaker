import {randomUUID} from "crypto";
import {Router} from "express";

import Story from "./stories.model";
import User from "../users/users.model";

const router = Router();

router.get('/', async (req, res) => {
  const stories = await Story.query()
                      .where('user_id', req.userJWT!.id)
                      .orderBy('updated_at', 'DESC');

  res.json({stories});
});

router.get('/:id', async (req, res, next) => {
  try {
    const story = await Story.query()
                      .where('user_id', req.userJWT!.id)
                      .where('id', req.params.id)
                      .first();

    if(!story) {
      res.status(404);
      next(new Error('Story not found'));
    }

    res.json({story});
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Story.query()
                        .where('user_id', req.userJWT!.id)
                        .where('id', req.params.id)
                        .first()
                        .patch({
                          flow : req.body.flow,
                        })
    res.json({message : 'OK'});
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.query().findById(req.userJWT!.id);
    const inserted = await user?.$relatedQuery('story').insert({
      id : randomUUID(),
      flow : {
        "drawflow" : {
          "Home" : {
            "data" : {
            }
          }
        }
      },
      name : req.body.name,
      user_id : req.userJWT!.id,
    });
    res.json({story : inserted});

  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await User.relatedQuery('story')
      .for(req.userJWT!.id)
      .deleteById(req.params.id);
    res.json({ message: 'OK' });
  } catch (error) {
    next(error);
  }
});

export default router;
