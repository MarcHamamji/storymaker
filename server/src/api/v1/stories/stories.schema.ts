import zod from 'zod';

const StorySchema = zod.object({
  name: zod.string().optional(),
  // TODO: write a flow validator
  flow: zod.any().optional(),
});

type StorySchema = zod.infer<typeof StorySchema>

export default StorySchema;
