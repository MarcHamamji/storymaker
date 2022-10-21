import { GrantConfig } from 'grant';
import config from './utils/config';

const grantConfig: GrantConfig = {
  defaults: {
    origin: `${config.HOST}:${config.SERVER_PORT}`,
    transport: 'session',
    prefix: '/api/v1/auth',
  },
  github: {
    client_id: config.GITHUB_OAUTH_CLIENT_ID,
    client_secret: config.GITHUB_OAUTH_CLIENT_SECRET,
    scope: ['user:email'],
  },
  google: {
    client_id: config.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: config.GOOGLE_OAUTH_CLIENT_SECRET,
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  },
};

export default grantConfig;
