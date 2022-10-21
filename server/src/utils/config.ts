import dotenv from 'dotenv';
import zod from 'zod';

dotenv.config();

const schema = zod.object({
  NODE_ENV: zod.enum(['development', 'production']).default('development'),
  HOST: zod.string().min(1),
  SERVER_PORT: zod.string().regex(/[0-9]+/).min(2),
  CLIENT_URL: zod.string().url().min(1),
  JWT_SECRET: zod.string().min(1),
  COOKIE_SECRET: zod.string().min(1),
  GITHUB_OAUTH_CLIENT_ID: zod.string().min(1),
  GITHUB_OAUTH_CLIENT_SECRET: zod.string().min(1),
  GOOGLE_OAUTH_CLIENT_ID: zod.string().min(1),
  GOOGLE_OAUTH_CLIENT_SECRET: zod.string().min(1),
  POSTGRES_HOST: zod.string().min(1),
  POSTGRES_USER: zod.string().min(1),
  POSTGRES_PASSWORD: zod.string().min(1),
  POSTGRES_DB: zod.string().min(1),
  POSTGRES_PORT: zod.string().regex(/[0-9]+/).min(2),
});

const config = schema.parse(process.env);

export default config;
