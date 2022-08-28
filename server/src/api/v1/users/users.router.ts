import { Router } from "express";

import UserModel from "./users.model";

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await UserModel.query()
      .findById(req.userJWT!.id);
    res.json({ user });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;

