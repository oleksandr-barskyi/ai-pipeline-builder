import { DraggableNode } from './draggableNode';
import {
    InputIcon,
    LlmIcon,
    OutputIcon,
    TextIcon,
    ApiIcon,
    FilterIcon,
    TransformIcon,
    ConditionIcon,
    MergeIcon,
} from './nodes/icons';

const toolbarNodes = [
    { type: 'customInput', label: 'Input', icon: InputIcon, accent: '#10b981' },
    { type: 'llm', label: 'LLM', icon: LlmIcon, accent: '#8b5cf6' },
    { type: 'customOutput', label: 'Output', icon: OutputIcon, accent: '#f43f5e' },
    { type: 'text', label: 'Text', icon: TextIcon, accent: '#6366f1' },
    { type: 'api', label: 'API', icon: ApiIcon, accent: '#0ea5e9' },
    { type: 'filter', label: 'Filter', icon: FilterIcon, accent: '#f59e0b' },
    { type: 'transform', label: 'Transform', icon: TransformIcon, accent: '#14b8a6' },
    { type: 'condition', label: 'Condition', icon: ConditionIcon, accent: '#fb923c' },
    { type: 'merge', label: 'Merge', icon: MergeIcon, accent: '#d946ef' },
];

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="pipeline-toolbar__brand">
                <span className="pipeline-toolbar__logo" aria-hidden="true" />
                <div className="pipeline-toolbar__brand-text">
                    <span className="pipeline-toolbar__wordmark">VectorShift</span>
                    <span className="pipeline-toolbar__subtitle">Pipeline Builder</span>
                </div>
            </div>
            <div className="pipeline-toolbar__nodes">
                {toolbarNodes.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        icon={node.icon}
                        accent={node.accent}
                    />
                ))}
            </div>
        </div>
    );
};
