import zod from 'zod';
import FlowSchema from './flow.schema';

const StorySchema = zod.object({
  name: zod.string().optional(),
  flow: FlowSchema.optional(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type StorySchema = zod.infer<typeof StorySchema>;

export default StorySchema;
