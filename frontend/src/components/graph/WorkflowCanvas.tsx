import { 
  ReactFlow,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkflowStore } from "../../state/workflowStore";
import { NodeRenderer } from "./NodeRenderer";
import { EdgeRenderer } from "./EdgeRenderer";

const nodeTypes = {
  custom: NodeRenderer,
};
const edgeTypes = {
  custom: EdgeRenderer,
};

export function WorkflowCanvas() {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);

  console.log("nodes", nodes);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      />
    </div>
  );
}