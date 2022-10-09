import axios from 'axios';
import { Router } from 'express';
import JWT from 'jsonwebtoken';
import config from '../../../utils/config';
import UserModel from '../users/users.model';

function generateJWT(id: number) {
  return JWT.sign({ id }, config.JWT_SECRET || 'keyboard_cat', {
    expiresIn: '7d',
  });
}

// Connection URL: http://192.168.1.111:5555/api/v1/auth/github
// Callback URL: http://192.168.1.111:5555/api/v1/auth/github/callback

const router = Router();

router.get('/github/callback', async (req, res) => {
  const grantResponse = (req.session as any).grant;
  const accessToken = grantResponse.response.access_token;

  const profile = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const emails = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Authorization: `token ${accessToken}`,
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
