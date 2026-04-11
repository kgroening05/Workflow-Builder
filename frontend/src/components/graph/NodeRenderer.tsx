import type { NodeProps } from "reactflow";
import type { WorkflowNodeData } from "../../types/nodes";


export function NodeRenderer({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <div className="p-2 bg-white border rounded shadow-sm">
      <strong>{data.label}</strong>
    </div>
  );
}