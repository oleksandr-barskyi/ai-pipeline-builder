import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';

export const ConditionNode = createConfigurableNode({
  title: 'Condition',
  subtitle: 'logic',
  fields: [
    {
      name: 'expression',
      label: 'Expression',
      defaultValue: '{{input}} !== ""',
    },
  ],
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    {
      type: 'source',
      position: Position.Right,
      id: 'true',
      style: { top: '38%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'false',
      style: { top: '70%' },
    },
  ],
});
