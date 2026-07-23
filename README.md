# AI Pipeline Builder

A full-stack prototype for building node-based AI workflows. The frontend provides a drag-and-drop canvas for composing pipelines from input, text, LLM, and output nodes, while the backend exposes a small FastAPI service for pipeline parsing.

## Features

- Drag-and-drop workflow editor built with ReactFlow
- Config-driven node abstraction for quickly adding new node types
- Custom node types for inputs, text prompts, LLM steps, outputs, API calls, filters, transforms, conditions, and merges
- Connectable nodes with animated edges
- Global pipeline state managed with Zustand
- FastAPI backend scaffold with a health check and pipeline parsing endpoint

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
GET /pipelines/parse
```

## Available Frontend Scripts

Run from the `frontend` directory:

```bash
npm start
npm test
npm run build
```

## Current Status

This project is an early prototype. The visual editor supports creating and connecting workflow nodes, and the backend currently provides a minimal parsing endpoint that can be extended with validation logic.
