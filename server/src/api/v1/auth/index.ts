import axios from 'axios';
import { Router } from 'express';
import JWT from 'jsonwebtoken';
import zod from 'zod';
import config from '../../../utils/config';
import requestValidator from '../../../utils/RequestValidator';
import UserModel from '../users/users.model';

function generateJWT(id: number) {
  return JWT.sign({ id }, config.JWT_SECRET || 'keyboard_cat', {
    expiresIn: '7d',
  });
}

const router = Router();

router.get('/github', (_req, res) => {
  const params = new URLSearchParams();
  params.set('client_id', config.GITHUB_OAUTH_CLIENT_ID as string);
  params.set('redirect_uri', `${config.HOST}:${config.SERVER_PORT}/api/v1/auth/github/callback`);
  params.set('scope', 'user:email');

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

router.get('/github/callback', requestValidator({
  query: zod.object({
    code: zod.string().min(1),
  }),
}), async (req, res) => {
  const { code } = req.query;

  const params = new URLSearchParams();
  params.set('client_id', config.GITHUB_OAUTH_CLIENT_ID as string);
  params.set('client_secret', config.GITHUB_OAUTH_CLIENT_SECRET as string);
  params.set('code', code as string);

  const response = await axios.post(`https://github.com/login/oauth/access_token?${params.toString()}`);
  const token = new URLSearchParams(response.data).get('access_token');
  const profile = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const emails = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const user = {
    email: emails.data.find((email: { primary: boolean }) => email.primary).email,
    name: profile.data.login,
    avatar_url: profile.data.avatar_url,
  };

  let dbUser = await UserModel.query().where('email', user.email).first();

  if (!dbUser) {
    dbUser = await UserModel.query().insert(user);
    console.log('Inserted user!');
  } else {
    console.log('User Exists!');
  }

  const jwt = generateJWT(dbUser.id);

  res.redirect(`${config.CLIENT_URL}/#/success?jwt=${jwt}`);
});

export default router;
