from typing import Any, Dict, List, Set

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    edges: List[Dict[str, Any]] = Field(default_factory=list)


def is_directed_acyclic_graph(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    node_ids: Set[str] = {
        str(node['id'])
        for node in nodes
        if isinstance(node, dict) and node.get('id') is not None
    }
    graph: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    indegree: Dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if not isinstance(edge, dict):
            continue

        source = edge.get('source')
        target = edge.get('target')

        if source is None or target is None:
            continue

        source_id = str(source)
        target_id = str(target)

        graph.setdefault(source_id, [])
        graph.setdefault(target_id, [])
        indegree.setdefault(source_id, 0)
        indegree.setdefault(target_id, 0)

        graph[source_id].append(target_id)
        indegree[target_id] += 1

    queue = [node_id for node_id, count in indegree.items() if count == 0]
    visited_count = 0

    while queue:
        node_id = queue.pop()
        visited_count += 1

        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(indegree)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelinePayload):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_directed_acyclic_graph(pipeline.nodes, pipeline.edges),
    }
