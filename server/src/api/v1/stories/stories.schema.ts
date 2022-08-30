import zod from 'zod';

const StorySchema = zod.object({
  name: zod.string().optional(),
  // TODO: write a flow validator
  flow: zod.any().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type StorySchema = zod.infer<typeof StorySchema>;

export default StorySchema;
