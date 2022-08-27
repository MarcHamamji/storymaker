import { Router } from "express";
import Story from "../../db-models/Story";

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const story = await Story.query()
      .findById(req.params.id);

    res.json({ story });
  } catch (error) {
    res.status(404);
    next(new Error("Story not found"));
  }
});

export default router;

