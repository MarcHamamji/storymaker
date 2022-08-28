import dotenv from 'dotenv';
import zod from 'zod';

dotenv.config();

const schema = zod.object({
  NODE_ENV: zod.enum(['development', 'production']).default('development'),
  HOST: zod.string(),
  SERVER_PORT: zod.string().regex(/[0-9]+/),
  CLIENT_URL: zod.string().url(),
  JWT_SECRET: zod.string(),
  GITHUB_OAUTH_CLIENT_ID: zod.string(),
  GITHUB_OAUTH_CLIENT_SECRET: zod.string(),
  POSTGRES_HOST: zod.string(),
  POSTGRES_USER: zod.string(),
  POSTGRES_PASSWORD: zod.string(),
  POSTGRES_DB: zod.string(),
});

const config = schema.parse(process.env);

export default config;
