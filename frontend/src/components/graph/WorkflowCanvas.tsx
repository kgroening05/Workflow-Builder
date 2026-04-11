import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "../../state/workflowStore";
import { NodeRenderer } from "./NodeRenderer";
import { EdgeRenderer } from "./EdgeRenderer";

export function WorkflowCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useWorkflowStore();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={{ custom: NodeRenderer }}
      edgeTypes={{ custom: EdgeRenderer }}
      fitView
    />
  );
}