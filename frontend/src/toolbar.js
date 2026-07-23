// toolbar.js

import { DraggableNode } from './draggableNode';

const toolbarNodes = [
    { type: 'customInput', label: 'Input' },
    { type: 'llm', label: 'LLM' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
    { type: 'api', label: 'API' },
    { type: 'filter', label: 'Filter' },
    { type: 'transform', label: 'Transform' },
    { type: 'condition', label: 'Condition' },
    { type: 'merge', label: 'Merge' },
];

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {toolbarNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </div>
    );
};
