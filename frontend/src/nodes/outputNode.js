import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';
import { OutputIcon } from './icons';

export const OutputNode = createConfigurableNode({
  title: 'Output',
  subtitle: 'result',
  icon: OutputIcon,
  accent: '#f43f5e',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      defaultValue: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' },
      ],
    },
  ],
  handles: [{ type: 'target', position: Position.Left, id: 'value' }],
});
