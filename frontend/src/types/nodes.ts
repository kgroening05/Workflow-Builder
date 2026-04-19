import type { Node } from '@xyflow/react';

export type WorkflowNodeData = {
  label: string;
  params: Record<string, unknown>;
};

export type WorkflowNode = Node<WorkflowNodeData, 'text'>;