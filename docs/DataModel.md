Data Model Definitions (MVP A)
These models define the core entities used throughout the system. They are intentionally minimal for MVP A but structured to support future expansion (e.g., versioning, multi-user, scheduling, plugin metadata).

1. Workflow
Represents a complete workflow graph.

| Field   | Type   | Description                                                       |
| ------- | ------ | ----------------------------------------------------------------- |
| `id`    | string | Unique workflow identifier (UUID). Optional for ad‑hoc workflows. |
| `name`  | string | Human‑readable workflow name.                                     |
| `nodes` | Node[] | List of nodes in the workflow.                                    |
| `edges` | Edge[] | List of edges defining graph connectivity.                        |


Notes
- A workflow must contain at least one node.
- Node IDs must be unique within a workflow.
- Edges must form a valid DAG (no cycles).

1. Node
Represents a single operation in the workflow.

| Field      | Type                       | Description                                                        |
| ---------- | -------------------------- | ------------------------------------------------------------------ |
| `id`       | string                     | Unique node identifier.                                            |
| `type`     | string                     | Node type key (e.g., `"csv_input"`, `"transform"`, `"summarize"`). |
| `position` | `{ x: number, y: number }` | UI position in the editor.                                         |
| `params`   | object                     | Node‑specific configuration parameters.                            |


Notes
- params schema depends on the node type.
- All required params must be present before execution.
- Position is ignored by the backend but required by the frontend.

3. Edge
Represents a directed connection between two nodes.

| Field    | Type   | Description                |
| -------- | ------ | -------------------------- |
| `id`     | string | Unique edge identifier.    |
| `source` | string | ID of the upstream node.   |
| `target` | string | ID of the downstream node. |


Notes
- Edges define execution order.
- Multiple edges from a node are allowed.
- Multiple edges into a node are allowed (fan‑in).

4. Run
Represents a single execution of a workflow.

| Field         | Type                                                | Description                                    |
| ------------- | --------------------------------------------------- | ---------------------------------------------- |
| `run_id`      | string                                              | Unique identifier for the run.                 |
| `workflow_id` | string or null                                      | ID of the workflow executed (null for ad‑hoc). |
| `status`      | `"pending" \| "running" \| "completed" \| "failed"` | Overall run status.                            |
| `results`     | Record\<string, NodeRunResult\>                     | Map of node ID → execution result.             |
| `started_at`  | datetime                                            | Timestamp when execution began.                |
| `finished_at` | datetime                                            | Timestamp when execution ended.                |


Notes
- MVP A does not persist runs long-term, but the structure supports it.
- results is ordered implicitly by node execution order.

5. NodeRunResult
Represents the execution result of a single node.

| Field            | Type                    | Description                                                       |
| ---------------- | ----------------------- | ----------------------------------------------------------------- |
| `status`         | `"success" \| "failed"` | Node execution status.                                            |
| `output_preview` | string                  | Human‑readable preview of output (first 10 rows or summary text). |
| `error`          | string or null          | Error message if the node failed.                                 |
| `duration_ms`    | number                  | Execution time in milliseconds.                                   |


Notes
- Full outputs are not stored in MVP A — only previews.
- Future versions may store full outputs or artifacts.

6. FileUpload
Represents an uploaded CSV file.

| Field          | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `file_id`      | string | Unique identifier for the uploaded file. |
| `filename`     | string | Original filename.                       |
| `content_type` | string | MIME type (must be `text/csv`).          |
| `size_bytes`   | number | File size in bytes.                      |


Notes
- MVP A stores files locally or in a simple storage directory.
- Future versions may use S3, GCS, or database-backed storage.
