import { useWorkflowStore } from "../../state/workflowStore";
import type { WorkflowNodeData } from "../../types/nodes";

export function NodeConfigPanel() {
  const selectedNode = useWorkflowStore((s) => s.selectedNode);

  if (!selectedNode) return <div className="p-4">No node selected</div>;

  const data = selectedNode.data as WorkflowNodeData;

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Node Config</h2>
      <pre>{JSON.stringify(data.params, null, 2)}</pre>
    </div>
  );
}