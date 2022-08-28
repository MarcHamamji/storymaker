import { Router } from "express";
import { IDParamValidator } from "../../../utils/RequestValidator";
import StoryModel from "../stories/stories.model";

const router = Router();

router.get('/:id', IDParamValidator, async (req, res, next) => {
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

