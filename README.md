# Workflow-Builder
AI Enabled Automated Workflow Builder



## 🏗️ Architecture
This project follows a modular, extensible architecture designed to support visual workflow creation, DAG‑based execution, and AI‑assisted workflow generation. MVP A focuses on a minimal but functional end‑to‑end system that can be expanded in later iterations.

## 🌐 High‑Level System Overview

``` mermaid
flowchart TD
    %% Frontend
    FE["
    **Frontend (React)**
    - Workflow Builder (UI)
    - React Flow Graph Editor
    - Node Config Panels
    - Run Viewer
    "] 

    FE -->|REST / JSON| API

    %% Backend API
    API["
    **Backend API (FastAPI)**
    - Workflow CRUD
    - Execute Workflow
    - AI Workflow Generator
    "] 

    API -->|Calls| ENG

    %% Workflow Engine
    ENG["
    **Workflow Engine**
    - DAG Builder
    - Topological Sort
    - Node Executor
    - Run Logging
    "] 

    ENG -->|Uses| REG

    %% Node Registry
    REG["
    **Node Registry**
    - CSV Input Node
    - Transform Node
    - LLM Summarizer Node
    "] 

    REG --> LLM

    %% External LLM
    LLM["
    **External LLM Service**
    - Workflow Generation
    - Summarization Node
    "]
```



## 🧩 Component Breakdown
### Frontend (React + React Flow)
The frontend provides a visual interface for building and running workflows.
Responsibilities
- Drag‑and‑drop workflow creation
- Node configuration panels
- Graph validation (basic)
- Save/load workflows
- Trigger execution
- Display run results
#### Key Modules
- GraphEditor
- NodePalette
- NodeConfigPanel
- RunResultsPanel
- WorkflowAPIClient

### Backend API (FastAPI)
A thin orchestration layer that exposes REST endpoints to the frontend.
#### Endpoints
- POST /workflows — save workflow
- GET /workflows/{id} — load workflow
- POST /execute — run workflow
- POST /ai/generate — natural‑language → workflow graph
#### Responsibilities
- Validate workflow JSON
- Forward workflows to the execution engine
- Return run results
- Call LLM for workflow generation

### Workflow Engine
The core execution layer responsible for running workflows as DAGs.
#### Responsibilities
- Parse workflow JSON into an internal graph model
- Validate DAG structure (no cycles, missing inputs)
- Topologically sort nodes
- Execute nodes sequentially
- Pass outputs to downstream nodes
- Collect logs and results
#### Internal Modules
- GraphParser
- DAGValidator
- Executor
- RunLogger

### Node Registry
A plugin‑style system that defines available node types.
#### Structure
``` json
NODE_TYPES = {
    "csv_input": CsvInputNode(),
    "transform": TransformNode(),
    "summarize": SummarizeNode(),
}
```

#### Node Interface
``` run(inputs, params) -> output ``` 

### MVP Node Types
- CSV Input Node → loads CSV into a DataFrame
- Transform Node → basic cleaning/filtering operations
- Summarize Node → LLM‑based text summary of DataFrame

### External Services
Used by the backend for AI‑powered features.
#### LLM Provider
- Workflow generation from natural language
- Summarization node execution

This remains decoupled from the engine for easy swapping or local model support later.

## 🔄 End‑to‑End Data Flow
User → Frontend → Backend API → Workflow Engine → Node Registry → LLM → Engine → Backend → Frontend → User

### Step‑by‑step
- User builds workflow visually
- Frontend sends workflow JSON to backend
- Backend validates and forwards to engine
- Engine builds and validates DAG
- Engine executes nodes in order
- Summarizer node calls LLM
- Engine collects outputs
- Backend returns results
- Frontend displays run logs and outputs
