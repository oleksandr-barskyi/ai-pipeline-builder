import { useEffect, useMemo, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import './baseNode.css';

const DEFAULT_TEXT = '{{input}}';
const MIN_NODE_WIDTH = 240;
const MAX_NODE_WIDTH = 520;
const NODE_PADDING_WIDTH = 72;
const TEXTAREA_HORIZONTAL_PADDING = 18;
const MIN_TEXTAREA_HEIGHT = 72;
const TEXTAREA_VERTICAL_PADDING = 18;
const AVERAGE_CHARACTER_WIDTH = 7.2;
const TEXTAREA_LINE_HEIGHT = 18;
const VARIABLE_PATTERN = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

const RESERVED_WORDS = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'let',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const extractVariables = (text) => {
  const variables = [];
  const seenVariables = new Set();
  const matches = text.matchAll(VARIABLE_PATTERN);

  for (const match of matches) {
    const variable = match[1];

    if (!RESERVED_WORDS.has(variable) && !seenVariables.has(variable)) {
      seenVariables.add(variable);
      variables.push(variable);
    }
  }

  return variables;
};

const getTextSize = (text) => {
  const lines = text.split('\n');
  const longestLineLength = Math.max(...lines.map((line) => line.length), 1);
  const width = clamp(
    longestLineLength * AVERAGE_CHARACTER_WIDTH + NODE_PADDING_WIDTH,
    MIN_NODE_WIDTH,
    MAX_NODE_WIDTH
  );
  const charactersPerLine = Math.max(
    1,
    Math.floor((width - TEXTAREA_HORIZONTAL_PADDING) / AVERAGE_CHARACTER_WIDTH)
  );
  const rowCount = lines.reduce(
    (count, line) => count + Math.max(1, Math.ceil(line.length / charactersPerLine)),
    0
  );
  const textareaHeight = Math.max(
    MIN_TEXTAREA_HEIGHT,
    rowCount * TEXTAREA_LINE_HEIGHT + TEXTAREA_VERTICAL_PADDING
  );

  return { width, textareaHeight };
};

const getHandleTop = (index, totalHandles) => `${((index + 1) * 100) / (totalHandles + 1)}%`;

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const [text, setText] = useState(data?.text ?? DEFAULT_TEXT);
  const variables = useMemo(() => extractVariables(text), [text]);
  const size = useMemo(() => getTextSize(text), [text]);
  const variableKey = variables.join('|');

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variableKey, size.width, size.textareaHeight]);

  const handleChange = (event) => {
    const nextText = event.target.value;
    setText(nextText);
    updateNodeField(id, 'text', nextText);
  };

  return (
    <div className="base-node base-node--text" style={{ width: size.width }}>
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: getHandleTop(index, variables.length) }}
        />
      ))}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
      <div className="base-node__header">
        <span className="base-node__title">Text</span>
        <span className="base-node__subtitle">prompt</span>
      </div>
      <div className="base-node__fields">
        <label className="base-node__field">
          <span className="base-node__field-label">Text</span>
          <textarea
            className="base-node__control text-node__textarea"
            value={text}
            onChange={handleChange}
            style={{ height: size.textareaHeight }}
          />
        </label>
      </div>
    </div>
  );
};
