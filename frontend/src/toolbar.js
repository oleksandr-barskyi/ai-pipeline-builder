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
        <div className="pipeline-toolbar">
            <div className="pipeline-toolbar__title">Nodes</div>
            <div className="pipeline-toolbar__nodes">
                {toolbarNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </div>
    );
};
