import { Router } from "express";

import User from "../../db-models/User";

const router = Router();

router.get('/', async (req, res) => {
  const user = await User.query()
    .findById(req.userJWT!.id);

  res.json({ user });
});

export default router;

