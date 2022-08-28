import { Router } from "express";
import zod from "zod";
import requestValidator from "../../../utils/RequestValidator";
import StoryModel from "../stories/stories.model";

const router = Router();

router.get('/:id', requestValidator({
  params: zod.object({
    id: zod.string().uuid(),
  }),
}), async (req, res, next) => {
  try {
    const story = await StoryModel.query()
      .findById(req.params.id);

    res.json({ story });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;

