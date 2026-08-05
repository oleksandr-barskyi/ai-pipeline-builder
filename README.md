# AI Pipeline Builder

A full-stack prototype for building node-based AI workflows. The frontend provides a drag-and-drop canvas for composing pipelines from input, text, LLM, and output nodes, while the backend exposes a small FastAPI service for pipeline parsing.

## Features

- Drag-and-drop workflow editor built with ReactFlow
- Config-driven node abstraction (BaseNode + node factory) for quickly adding new node types
- Custom node types for inputs, text prompts, LLM steps, outputs, API calls, filters, transforms, conditions, and merges
- VectorShift-inspired design: branded toolbar, per-category node icons and accent colors, styled handles, selection states
- Text node with auto-resizing textarea and dynamic `{{variable}}` input handles
- Connectable nodes with animated edges
- Global pipeline state managed with Zustand
- Submit flow that sends the pipeline to the backend and shows node/edge counts and DAG validity in a styled result modal
- FastAPI backend with a health check, pipeline parsing endpoint (Kahn's algorithm DAG check), and pytest coverage

## Tech Stack

**Frontend**

- React
- ReactFlow
- Zustand
- Create React App

**Backend**

- Python
- FastAPI
- Uvicorn

## Project Structure

```text
.
|-- backend/
|   `-- main.py
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- nodes/
|   |   |-- App.js
|   |   |-- store.js
|   |   |-- toolbar.js
|   |   `-- ui.js
|   |-- package.json
|   `-- package-lock.json
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.10+

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

### Backend

```bash
cd backend
pip install fastapi uvicorn python-multipart
uvicorn main:app --reload --port 8000
```

The backend runs at:

```text
http://localhost:8000
```

Health check:

```text
GET /
```

Pipeline parser endpoint:

```text
POST /pipelines/parse
```

Backend tests:

```bash
pip install pytest httpx
python -m pytest backend
```

## Available Frontend Scripts

Run from the `frontend` directory:

```bash
npm start
npm test
npm run build
```

## Current Status

All four parts of the assessment are complete: the reusable node abstraction with five extra demo nodes, the unified VectorShift-style design, the dynamic Text node behavior, and the frontend/backend integration with DAG validation surfaced in a result modal. The backend logic is covered by pytest.
