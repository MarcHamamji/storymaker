import zod from 'zod';
import FlowSchema from '../../api/v1/stories/flow.schema';
import { created, timestamps } from './utils';

const StorySchema = zod.object({
  id: created(zod.string()),
  user_id: zod.number(),
  name: zod.string(),
  flow: FlowSchema,
  ...timestamps(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type StorySchema = zod.infer<typeof StorySchema>;

export const StoryPublicData = StorySchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StoryPublicData = zod.infer<typeof StoryPublicData>;

export default StorySchema;
