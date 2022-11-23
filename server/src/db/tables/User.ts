import zod from 'zod';
import { generated, timestamps } from './utils';

const UserSchema = zod.object({
  id: generated<number>(zod.number()),
  name: zod.string(),
  email: zod.string(),
  avatar_url: zod.string(),
  ...timestamps(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type UserSchema = zod.infer<typeof UserSchema>;

export default UserSchema;
