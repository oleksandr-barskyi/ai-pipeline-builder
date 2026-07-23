import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';

export const MergeNode = createConfigurableNode({
  title: 'Merge',
  subtitle: 'combine',
  fields: [
    {
      name: 'mergeMode',
      label: 'Mode',
      type: 'select',
      defaultValue: 'concat',
      options: [
        { value: 'concat', label: 'Concat' },
        { value: 'json', label: 'JSON' },
        { value: 'priority', label: 'Priority' },
      ],
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'first',
      style: { top: '38%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'second',
      style: { top: '70%' },
    },
    { type: 'source', position: Position.Right, id: 'merged' },
  ],
});
