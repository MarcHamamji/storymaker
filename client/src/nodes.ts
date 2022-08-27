import type { Component } from 'vue';
import StartNode from './components/nodes/StartNode.vue';
import SceneNode from './components/nodes/SceneNode.vue';
import EndNode from './components/nodes/EndNode.vue';
import CommentNode from './components/nodes/CommentNode.vue';

export interface NodeObject {
  name: string;
  component: Component;
  inputs: number;
  outputs: number;
  data: unknown;
}

const nodes: NodeObject[] = [
  {
    name: 'StartNode',
    component: StartNode,
    inputs: 0,
    outputs: 1,
    data: {},
  },
  {
    name: 'EndNode',
    component: EndNode,
    inputs: 1,
    outputs: 0,
    data: {},
  },
  {
    name: 'SceneNode',
    component: SceneNode,
    inputs: 1,
    outputs: 2,
    data: {
      choices: [
        'Choice 1',
        'Choice 2',
      ],
      description: 'Description',
    },
  },
  {
    name: 'CommentNode',
    component: CommentNode,
    inputs: 0,
    outputs: 0,
    data: {
      text: 'Comment',
    },
  },
];

export default nodes;
