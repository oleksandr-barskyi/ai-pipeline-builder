// submit.js

import { useState } from 'react';
import { useStore } from './store';

const PIPELINE_PARSE_URL = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch(PIPELINE_PARSE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Pipeline parse failed with status ${response.status}`);
            }

            const { num_nodes, num_edges, is_dag } = await response.json();

            alert(
                `Pipeline summary:\n` +
                `Nodes: ${num_nodes}\n` +
                `Edges: ${num_edges}\n` +
                `Directed acyclic graph: ${is_dag ? 'Yes' : 'No'}`
            );
        } catch (error) {
            console.error('Failed to submit pipeline:', error);
            alert(
                'Unable to parse the pipeline. Please make sure the backend is running on http://localhost:8000 and try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-bar">
            <button
                className="submit-bar__button"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
}
