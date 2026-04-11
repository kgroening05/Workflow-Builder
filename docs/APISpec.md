# API Specification
## 1. Workflow CRUD
   
POST /workflows

Create or update a workflow.

### Request Body
``` json
{
  "id": "optional-string",
  "name": "My Workflow",
  "nodes": [
    {
      "id": "node-1",
      "type": "csv_input",
      "position": { "x": 100, "y": 200 },
      "params": {
        "file_id": "abc123"
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2"
    }
  ]
}
```

### Response
``` json
{
  "id": "generated-or-existing-id",
  "status": "saved"
}
```

GET /workflows/{id}

Retrieve a workflow by ID.

Response
``` json
{
  "id": "workflow-123",
  "name": "My Workflow",
  "nodes": [...],
  "edges": [...]
}
```

## 2. Execute Workflow

POST /execute

Run a workflow end-to-end.

Request Body
``` json
{
  "workflow_id": "workflow-123"
}
```

Or run an ad-hoc workflow without saving:
``` json
{
  "workflow": {
    "nodes": [...],
    "edges": [...]
  }
}
```

Response
``` json
{
  "run_id": "run-789",
  "status": "completed",
  "results": {
    "node-1": {
      "status": "success",
      "output_preview": "first 10 rows or text"
    },
    "node-2": {
      "status": "success",
      "output_preview": "summary text"
    }
  }
}
```

Error Response
``` json
{
  "run_id": "run-789",
  "status": "failed",
  "error": {
    "node_id": "node-2",
    "message": "Missing required column 'age'"
  }
}
```


## 3. File Upload (for CSV Input Node)
POST /files

Upload a CSV file.

Multipart Form Data
- file: CSV file

Response
``` json
{
  "file_id": "abc123",
  "filename": "data.csv"
}
```


## 4. AI Workflow Generator
POST /ai/generate

Generate a workflow graph from natural language.

Request Body
``` json
{
  "prompt": "When I upload a CSV, clean it and summarize it."
}
```

Response
``` json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "csv_input",
      "params": {}
    },
    {
      "id": "node-2",
      "type": "transform",
      "params": { "operation": "drop_na" }
    },
    {
      "id": "node-3",
      "type": "summarize",
      "params": {}
    }
  ],
  "edges": [
    { "source": "node-1", "target": "node-2" },
    { "source": "node-2", "target": "node-3" }
  ]
}
```

Error Response
``` json
{
  "error": "Unable to generate a valid workflow. Try rephrasing your request."
}



## 5. Data Models
Workflow
{
  "id": "string",
  "name": "string",
  "nodes": [Node],
  "edges": [Edge]
}
```


Node
``` json
{
  "id": "string",
  "type": "csv_input | transform | summarize",
  "position": { "x": 0, "y": 0 },
  "params": { "key": "value" }
}
```

Edge
``` json
{
  "id": "string",
  "source": "node-id",
  "target": "node-id"
}
```

Run Result
``` json
{
  "run_id": "string",
  "status": "completed | failed",
  "results": {
    "node-id": {
      "status": "success | failed",
      "output_preview": "string",
      "error": "optional string"
    }
  }
}
```


## 6. Validation Rules
Workflow
- Must contain at least one node
- Node IDs must be unique
- Edges must reference valid node IDs
- Graph must be acyclic
- All required node params must be present
  
Execution
- Engine must validate DAG before running
- Node failures stop execution (MVP A)
- Outputs must be JSON‑serializable or previewable
  
AI Generator
- Must return valid node types
- Must return a DAG (no cycles)
- Must include at least one node

## 7. Status Codes

| Code | Meaning                         |
| ---- | ------------------------------- |
| 200  | success                         |
| 201  | Created                         |
| 400  | Invalid Workflow or bad request |
| 404  | Workflow not found              |
| 500  | Execution or server error       |





