import zod from 'zod';

const inputSchema = zod.string().regex(/^input_[0-9]+$/);
const outputSchema = zod.string().regex(/^output_[0-9]+$/);

const numberAsString = zod.string().regex(/^[0-9]+$/);

const generateNodeSchema = (
  name: string,
  dataSchema: zod.AnyZodObject,
) => zod.object({
  id: zod.number().positive(),
  name: zod.literal(name),
  data: dataSchema,
  class: zod.literal(name),
  html: zod.literal(name),
  typenode: zod.literal('vue'),
  inputs: zod.record(inputSchema, zod.object({
    connections: zod.array(zod.object({
      node: numberAsString,
      input: outputSchema,
    })),
  })),
  outputs: zod.record(outputSchema, zod.object({
    connections: zod.array(zod.object({
      node: numberAsString,
      output: inputSchema,
    })),
  })),
  pos_x: zod.number(),
  pos_y: zod.number(),
});

const FlowSchema = zod.object({
  drawflow: zod.object({
    Home: zod.object({
      data: zod.record(
        numberAsString,
        generateNodeSchema('StartNode', zod.object({})).or(
          generateNodeSchema('EndNode', zod.object({})),
        ).or(
          generateNodeSchema('CommentNode', zod.object({
            text: zod.string(),
          })),
        ).or(
          generateNodeSchema('SceneNode', zod.object({
            choices: zod.array(zod.string()),
            description: zod.string(),
          })),
        ),
      ),
    }),
  }),
}).refine((flow) => {
  const nodes = Object.values(flow.drawflow.Home.data).filter((node) => node.class === 'StartNode');
  if (nodes.length !== 1) return false;
  const startNode = nodes[0];
  if (startNode.outputs.output_1.connections.length !== 1) return false;
  return true;
}, {
  message: 'The story should contain exactly one "Start" node.',
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
type FlowSchema = zod.infer<typeof FlowSchema>;

export default FlowSchema;
