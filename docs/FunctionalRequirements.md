# Functional Requirements Document (FRD)
Project: AI Workflow Orchestrator — MVP A
Author: Kyle
Version: 1.0
Status: Draft

## 1. System Overview
The AI Workflow Orchestrator is a web application that allows users to visually construct data-processing workflows using a node‑based editor. Users can upload files, apply transformations, and generate summaries using an integrated LLM. The system executes workflows as directed acyclic graphs (DAGs) and provides run results and basic logs. MVP A focuses on core functionality: workflow creation, execution, and AI-assisted workflow generation.

## 2. User Roles
2.1 Single User
MVP A supports a single, unauthenticated user.
No multi-user features, permissions, or accounts are included.

## 3. Functional Requirements
### 3.1 Workflow Builder
The system shall:
- Allow users to create workflows using a drag‑and‑drop node editor.
- Allow users to add, move, and delete nodes.
- Allow users to connect nodes with edges to define execution order.
- Display node configuration panels for editing parameters.
- Validate basic graph structure (e.g., no missing required params).
### 3.2 Workflow Persistence
The system shall:
- Allow users to save a workflow to the backend.
- Allow users to load a previously saved workflow.
- Assign a unique ID to each saved workflow.
### 3.3 File Upload
The system shall:
- Allow users to upload CSV files.
- Store uploaded files and return a file_id for reference.
- Validate that uploaded files are valid CSVs.
### 3.4 Workflow Execution
The system shall:
- Allow users to execute a saved workflow by ID.
- Allow users to execute an ad‑hoc workflow without saving.
- Validate the workflow before execution (acyclic, valid node types, required params).
- Execute nodes in topological order.
- Pass outputs from each node to its downstream nodes.
- Stop execution on the first node failure (MVP A).
- Return run results including node statuses and output previews.
### 3.5 Node Types (MVP A)
The system shall support the following nodes:
CSV Input Node
- Inputs: none
- Params: file_id
- Output: DataFrame
Transform Node
- Inputs: DataFrame
- Params:
- operation: "drop_na" | "filter" | "select_columns"
- Additional params depending on operation
- Output: DataFrame
Summarize Node
- Inputs: DataFrame
- Params: none
- Output: text summary (via LLM)
### 3.6 AI Workflow Generation
The system shall:
- Accept a natural-language prompt from the user.
- Generate a workflow graph (nodes + edges) using an LLM.
- Validate the generated workflow.
- Return the workflow to the frontend for display.
- Provide an error message if generation fails.
### 3.7 Run Results & Logging
The system shall:
- Display node-by-node execution status.
- Provide output previews (first 10 rows or summary text).
- Display error messages for failed nodes.
- Provide a simple run summary (success/failed).

## 4. Non‑Functional Requirements
### 4.1 Performance
- Workflow execution should complete within a reasonable time for small CSVs (<5MB).
- UI interactions (dragging nodes, connecting edges) should feel responsive.
### 4.2 Reliability
- The system should validate workflows before execution to prevent runtime errors.
- The system should handle malformed CSVs gracefully.
### 4.3 Extensibility
- Node registry must support adding new node types without modifying the engine.
- Workflow engine must support future parallel execution or distributed workers.
- AI generation endpoint must support additional LLM providers.
### 4.4 Maintainability
- Code should be modular and follow clear separation of concerns.
- Backend should use typed models (Pydantic) for validation.

## 5. Constraints
- Only CSV files are supported in MVP A.
- Only three node types are available: CSV Input, Transform, Summarize.
- Execution is sequential (no parallelism).
- No user authentication or multi-user support.
- No workflow scheduling or triggers.

## 6. Out of Scope (MVP A)
- Real-time collaboration
- User accounts or permissions
- Workflow versioning
- Scheduled or recurring workflows
- Parallel or distributed execution
- Plugin marketplace
- Advanced transformations (joins, merges, aggregations)
- Large file handling (>5MB)

## 7. Acceptance Criteria
MVP A is complete when:
- A user can visually build a workflow with the three node types.
- A user can upload a CSV and reference it in a workflow.
- A user can run a workflow and see node-by-node results.
- A user can save and load workflows.
- A user can generate a workflow from natural language.
- The system validates workflows before execution.
- The system handles errors gracefully and displays them in the UI.
