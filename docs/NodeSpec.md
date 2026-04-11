Absolutely — here is a clean, professional, concise Node Type Specification document for MVP A. This completes the final Phase 1 deliverable and gives you a rock‑solid foundation for implementing the node system.

You can drop this directly into `/docs/node_types.md` or your README.

---

# ⚙️Node Type Specification — MVP A

This document defines the node types supported in MVP A of the AI Workflow Orchestrator. Each node type includes its purpose, inputs, outputs, parameters, validation rules, and example JSON definitions.

MVP A includes three node types:

1. CSV Input Node 
2. Transform Node 
3. Summarize Node

---

# 1. CSV Input Node

### Type Key
```
csv_input
```

### Purpose
Loads a CSV file (previously uploaded) into a DataFrame for downstream processing.

### Inputs
- None

### Outputs
- `DataFrame` (Pandas)

### Parameters
| Param     | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| `file_id` | string | Yes      | Identifier returned by the file upload API. |

### Validation Rules
- `file_id` must reference an existing uploaded file.
- File must be a valid CSV.
- File size must be within allowed limits (MVP A: small CSVs only).

### Error Conditions
- File not found  
- Invalid CSV format  
- File unreadable  

### Example Node JSON
```json
{
  "id": "node-1",
  "type": "csv_input",
  "position": { "x": 100, "y": 200 },
  "params": {
    "file_id": "abc123"
  }
}
```

---

# 2. Transform Node

### Type Key
```
transform
```

### Purpose
Applies a simple transformation to a DataFrame.

### Inputs
- `DataFrame` from upstream node

### Outputs
- `DataFrame` (transformed)

### Supported Operations (MVP A)
1. `drop_na` — remove rows with missing values  
2. `filter` — filter rows based on a condition  
3. `select_columns` — keep only specified columns  

### Parameters
| Param       | Type     | Required                      | Description                                         |
| ----------- | -------- | ----------------------------- | --------------------------------------------------- |
| `operation` | string   | Yes                           | One of `"drop_na"`, `"filter"`, `"select_columns"`. |
| `condition` | string   | Required for `filter`         | A simple boolean expression (e.g., `"age > 30"`).   |
| `columns`   | string[] | Required for `select_columns` | List of column names to keep.                       |

### Validation Rules
- `operation` must be one of the supported operations.
- Required params must be present depending on the operation.
- Input must be a DataFrame.

### Error Conditions
- Invalid column names  
- Invalid filter expression  
- DataFrame missing required fields  

### Example Node JSON
```json
{
  "id": "node-2",
  "type": "transform",
  "position": { "x": 300, "y": 200 },
  "params": {
    "operation": "drop_na"
  }
}
```

---

# 3. Summarize Node

### Type Key
```
summarize
```

### Purpose
Generates a natural-language summary of a DataFrame using an LLM.

### Inputs
- `DataFrame` from upstream node

### Outputs
- `string` (text summary)

### Parameters
| Param    | Type | Required | Description                              |
| -------- | ---- | -------- | ---------------------------------------- |
| (none) | —    | —        | MVP A uses a fixed summarization prompt. |

### Validation Rules
- Input must be a DataFrame.
- DataFrame must not be empty.

### Error Conditions
- LLM request failure  
- DataFrame too large to summarize  
- Unsupported data types  

### Example Node JSON
```json
{
  "id": "node-3",
  "type": "summarize",
  "position": { "x": 500, "y": 200 },
  "params": {}
}
```

---

# 🧱 Node Execution Contract

All nodes must implement the following interface (conceptually):

```
run(inputs: dict, params: dict) -> output
```

Where:

- `inputs` contains outputs from upstream nodes  
- `params` contains node-specific configuration  
- `output` must be JSON‑serializable or convertible to a preview  

---

# 🧠 Why This Spec Matters

This document:

- Defines the contract between frontend and backend  
- Ensures nodes are consistent and predictable  
- Makes the DAG executor straightforward to implement  
- Sets the stage for adding new node types in MVP B/C  
- Keeps MVP A tightly scoped and buildable  

With this, Phase 1 is officially complete.

---

If you want, we can now move into Phase 2: Frontend Workflow Builder, starting with:

- React project structure  
- React Flow graph model  
- Node palette design  
- State management (Zustand)  
- Save/load workflow flows  

Where do you want to go next?
