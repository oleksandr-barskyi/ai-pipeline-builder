import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';

export const LLMNode = createConfigurableNode({
  title: 'LLM',
  subtitle: 'model',
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      defaultValue: 'gpt-4o-mini',
      options: [
        { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'claude', label: 'Claude' },
      ],
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'system',
      style: { top: `${100 / 3}%` },
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt',
      style: { top: `${200 / 3}%` },
    },
    { type: 'source', position: Position.Right, id: 'response' },
  ],
});
