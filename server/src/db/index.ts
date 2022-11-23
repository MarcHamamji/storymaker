import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import config from '../utils/config';
import UserSchema from './tables/User';
import StorySchema from './tables/Story';

interface Database {
  user: UserSchema;
  story: StorySchema;
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: config.POSTGRES_HOST,
      database: config.POSTGRES_DB,
      port: config.POSTGRES_PORT,
      user: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
    }),
  }),
});

export default db;
