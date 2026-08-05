import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';
import { InputIcon } from './icons';

export const InputNode = createConfigurableNode({
  title: 'Input',
  subtitle: 'source',
  icon: InputIcon,
  accent: '#10b981',
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
