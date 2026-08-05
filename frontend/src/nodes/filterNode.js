import { Position } from 'reactflow';
import { createConfigurableNode } from './nodeFactory';
import { FilterIcon } from './icons';

export const FilterNode = createConfigurableNode({
  title: 'Filter',
  subtitle: 'branch',
  icon: FilterIcon,
  accent: '#f59e0b',
  fields: [
    {
      name: 'field',
      label: 'Field',
      defaultValue: 'status',
    },
    {
      name: 'operator',
      label: 'Operator',
      type: 'select',
      defaultValue: 'equals',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'startsWith', label: 'Starts with' },
        { value: 'exists', label: 'Exists' },
      ],
    },
  ],
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    {
      type: 'source',
      position: Position.Right,
      id: 'matched',
      style: { top: '38%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'unmatched',
      style: { top: '70%' },
    },
  ],
});
