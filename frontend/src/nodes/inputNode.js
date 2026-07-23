import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';

export const InputNode = createConfigurableNode({
  title: 'Input',
  subtitle: 'source',
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      defaultValue: (id) => id.replace('customInput-', 'input_'),
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
  handles: [{ type: 'source', position: Position.Right, id: 'value' }],
});
