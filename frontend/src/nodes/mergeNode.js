import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';
import { MergeIcon } from './icons';

export const MergeNode = createConfigurableNode({
  title: 'Merge',
  subtitle: 'combine',
  icon: MergeIcon,
  accent: '#d946ef',
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
