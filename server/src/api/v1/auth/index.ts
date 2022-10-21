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

interface UserProfile {
  email: string;
  name: string,
  avatar_url: string,
}

async function createOrGetUser(profile: UserProfile) {
  let dbUser = await UserModel.query().where('email', profile.email).first();

  if (!dbUser) {
    dbUser = await UserModel.query().insert(profile);
    console.log('Inserted user!');
  } else {
    console.log('User Exists!');
  }
  return dbUser;
}

// Connection URL: http://localhost:5555/api/v1/auth/provider
// Callback URL: http://localhost:5555/api/v1/auth/provider/callback

const router = Router();

router.get('/google/callback', async (req, res) => {
  const grantResponse = (req.session as any).grant;

  const response = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
    headers: {
      Authorization: `Bearer ${grantResponse.response.raw.access_token}`,
    },
  });

  const profile = {
    email: response.data.email,
    name: response.data.name,
    avatar_url: response.data.picture,
  };

  const dbUser = await createOrGetUser(profile);

  const jwt = generateJWT(dbUser.id);

  res.redirect(`${config.CLIENT_URL}/#/success?jwt=${jwt}`);
});

router.get('/github/callback', async (req, res) => {
  const grantResponse = (req.session as any).grant;
  const accessToken = grantResponse.response.access_token;

  const [user, emails] = await Promise.all([
    axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    }),
    axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    }),
  ]);

  const profile = {
    email: emails.data.find((email: { primary: boolean }) => email.primary).email,
    name: user.data.login,
    avatar_url: user.data.avatar_url,
  };

  const dbUser = await createOrGetUser(profile);

  const jwt = generateJWT(dbUser.id);

  res.redirect(`${config.CLIENT_URL}/#/success?jwt=${jwt}`);
});

export default router;
