import { Router } from "express";

import UserModel from "./users.model";

const router = Router();

router.get('/', async (req, res) => {
  const user = await UserModel.query()
    .findById(req.userJWT!.id);

  res.json({ user });
});

export default router;

