import { useState } from 'react';
import { useStore } from './store';

const PIPELINE_PARSE_URL = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const closeModal = () => {
        setResult(null);
        setError(null);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setResult(null);
        setError(null);

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
            setResult({ numNodes: num_nodes, numEdges: num_edges, isDag: is_dag });
        } catch (submitError) {
            console.error('Failed to submit pipeline:', submitError);
            setError(
                'Backend unreachable at http://localhost:8000. Make sure the FastAPI server is running and try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const isModalOpen = result !== null || error !== null;

    return (
        <div className="submit-bar">
            <button
                className="submit-bar__button"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="submit-bar__spinner" aria-hidden="true" />
                        Submitting...
                    </>
                ) : (
                    'Submit Pipeline'
                )}
            </button>
            {isModalOpen ? (
                <div className="result-modal__overlay" onClick={closeModal}>
                    <div
                        className={`result-modal${error ? ' result-modal--error' : ''}`}
                        role="dialog"
                        aria-modal="true"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2 className="result-modal__title">
                            {error ? 'Submission failed' : 'Pipeline analysis'}
                        </h2>
                        {error ? (
                            <p className="result-modal__message">{error}</p>
                        ) : (
                            <>
                                <div className="result-modal__rows">
                                    <div className="result-modal__row">
                                        <span className="result-modal__row-label">Nodes</span>
                                        <span className="result-modal__row-value">{result.numNodes}</span>
                                    </div>
                                    <div className="result-modal__row">
                                        <span className="result-modal__row-label">Edges</span>
                                        <span className="result-modal__row-value">{result.numEdges}</span>
                                    </div>
                                </div>
                                <div
                                    className={`result-modal__badge ${
                                        result.isDag
                                            ? 'result-modal__badge--valid'
                                            : 'result-modal__badge--invalid'
                                    }`}
                                >
                                    {result.isDag ? 'Valid DAG' : 'Cycle detected'}
                                </div>
                            </>
                        )}
                        <button
                            className="result-modal__close"
                            type="button"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
