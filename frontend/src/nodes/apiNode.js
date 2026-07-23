import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';

export const ApiNode = createConfigurableNode({
  title: 'API',
  subtitle: 'request',
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
    {
      name: 'url',
      label: 'URL',
      placeholder: 'https://api.example.com',
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'query',
      style: { top: '42%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'headers',
      style: { top: '72%' },
    },
    { type: 'source', position: Position.Right, id: 'response' },
  ],
});
