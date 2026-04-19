import type { NodeProps } from "@xyflow/react";
import type { WorkflowNode } from "../../types/nodes";

export function NodeRenderer({ data }: NodeProps<WorkflowNode>) {
  return (
    <div className="p-2 bg-white border rounded shadow-sm">
      <strong>{data.label}</strong>
    </div>
  );
}
