import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';

export const TextNode = createConfigurableNode({
  title: 'Text',
  subtitle: 'prompt',
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      defaultValue: '{{input}}',
      rows: 3,
    },
  ],
  handles: [{ type: 'source', position: Position.Right, id: 'output' }],
});
