from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def parse(nodes, edges):
    response = client.post('/pipelines/parse', json={'nodes': nodes, 'edges': edges})
    assert response.status_code == 200
    return response.json()


def test_root_ping_pong():
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == {'Ping': 'Pong'}


def test_empty_pipeline():
    result = parse([], [])
    assert result == {'num_nodes': 0, 'num_edges': 0, 'is_dag': True}


def test_linear_pipeline_is_dag():
    nodes = [{'id': 'a'}, {'id': 'b'}, {'id': 'c'}]
    edges = [
        {'source': 'a', 'target': 'b'},
        {'source': 'b', 'target': 'c'},
    ]
    result = parse(nodes, edges)
    assert result == {'num_nodes': 3, 'num_edges': 2, 'is_dag': True}


def test_cycle_is_not_dag():
    nodes = [{'id': 'a'}, {'id': 'b'}]
    edges = [
        {'source': 'a', 'target': 'b'},
        {'source': 'b', 'target': 'a'},
    ]
    result = parse(nodes, edges)
    assert result == {'num_nodes': 2, 'num_edges': 2, 'is_dag': False}


def test_self_loop_is_not_dag():
    nodes = [{'id': 'a'}]
    edges = [{'source': 'a', 'target': 'a'}]
    result = parse(nodes, edges)
    assert result == {'num_nodes': 1, 'num_edges': 1, 'is_dag': False}


def test_edge_with_unknown_node_id():
    nodes = [{'id': 'a'}]
    edges = [{'source': 'a', 'target': 'ghost'}]
    result = parse(nodes, edges)
    assert result == {'num_nodes': 1, 'num_edges': 1, 'is_dag': True}


def test_diamond_branching_is_dag():
    nodes = [{'id': 'a'}, {'id': 'b'}, {'id': 'c'}, {'id': 'd'}]
    edges = [
        {'source': 'a', 'target': 'b'},
        {'source': 'a', 'target': 'c'},
        {'source': 'b', 'target': 'd'},
        {'source': 'c', 'target': 'd'},
    ]
    result = parse(nodes, edges)
    assert result == {'num_nodes': 4, 'num_edges': 4, 'is_dag': True}
