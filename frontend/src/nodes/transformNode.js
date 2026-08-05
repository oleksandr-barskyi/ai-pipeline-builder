import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';
import { TransformIcon } from './icons';

export const TransformNode = createConfigurableNode({
  title: 'Transform',
  subtitle: 'data',
  icon: TransformIcon,
  accent: '#14b8a6',
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      defaultValue: 'format',
      options: [
        { value: 'format', label: 'Format' },
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'extract', label: 'Extract' },
      ],
    },
    {
      name: 'targetKey',
      label: 'Target key',
      defaultValue: 'result',
    },
  ],
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ],
});
