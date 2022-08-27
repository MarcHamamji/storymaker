import { Router } from "express";
import auth from './auth';
import { isLoggedIn } from './auth/middlewares';
import stories from './stories';
import users from './users';
import play from './play';

const router = Router();

router.use('/auth', auth);

router.use('/play', play);

router.use(isLoggedIn);

router.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

router.use('/stories', stories);
router.use('/users', users);

export default router;
