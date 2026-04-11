# Project Plan
## Phase 1 — Requirements & Architecture (2–3 days)
#### Deliverables
- Functional requirements document
- Non-functional requirements (performance, reliability, extensibility)
- High-level architecture diagram
- Data model definitions (Workflow, Node, Edge, Run)
- API contract (OpenAPI or markdown spec)
- Node type specification for MVP (CSV Input, Transform, Summarize)
#### Acceptance Criteria
- You can describe the entire system end-to-end without ambiguity
- You know exactly what each component is responsible for
- You have a stable API to build against

## 🎨 Phase 2 — Frontend Workflow Builder (1–1.5 weeks)
This is the most visible part, so it’s worth doing cleanly.
#### Milestones
- React + React Flow scaffold
- Node palette + drag-and-drop
- Edge creation + validation
- Node configuration panel
- Workflow state management (Zustand)
- Save/load workflow from backend
- Basic “Run Workflow” button + status display
#### Acceptance Criteria
- You can visually create a workflow with nodes and edges
- You can configure node parameters
- You can save/load workflows
- You can trigger execution and see basic results

## ⚙️ Phase 3 — Backend Workflow Engine (1–1.5 weeks)
This is the “meat” of MVP A.
#### Milestones
- FastAPI project scaffold
- Workflow CRUD endpoints
- DAG builder + topological sort
- Node registry + execution interface
- Execution engine (sequential for MVP)
- Run results + error handling
- Integration with frontend
#### Acceptance Criteria
- Backend accepts workflow JSON
- Converts to DAG and validates it
- Executes nodes in correct order
- Returns results and errors
- Frontend can run workflows end-to-end

## 🔌 Phase 4 — Node Implementations (3–5 days)
#### MVP Node Types
- CSV Input Node
- Upload CSV → Pandas DataFrame
- Transform Node
- Drop NA
- Filter rows
- Select columns
- LLM Summarizer Node
- Convert DataFrame → text summary
#### Acceptance Criteria
- Each node implements a clean run(inputs, params) interface
- Nodes can be chained together
- Outputs flow correctly through the DAG

## 🤖 Phase 5 — AI Workflow Generator (1 week)
This is the “wow” feature.
#### Milestones
- Prompt design
- LLM endpoint in backend
- Schema validation for AI-generated workflows
- Frontend integration (“Generate Workflow” modal)
- Error handling + fallback suggestions
#### Acceptance Criteria
- User can type: “Clean a CSV and summarize it”
- AI returns a valid workflow graph
- Graph loads into the editor
- User can run it immediately

## 📊 Phase 6 — Run Logs & Basic UX Polish (3–5 days)
#### Milestones
- Node-by-node status indicators
- Output previews (first 10 rows or text)
- Error messages
- Loading states
- Minimal styling pass
#### Acceptance Criteria
- A workflow run feels like a real, traceable process
- Errors are understandable
- The UI feels coherent and demo-ready

## 🎬 Phase 7 — Final Integration, Testing & Demo Prep (3–5 days)
#### Milestones
- End-to-end testing
- Fixing edge cases
- Demo workflow examples
- README + architecture doc
- Deployment (Render, Fly.io, or Vercel + backend host)
#### Acceptance Criteria
- You can demo the app in 2 minutes
- Everything works reliably
