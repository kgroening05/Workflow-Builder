import { create } from "zustand";
import type { Node, Edge, NodeChange, EdgeChange } from '@xyflow/react';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { WorkflowNodeData } from "../types/nodes";

type WorkflowNode = Node<WorkflowNodeData, "custom">;
type WorkflowEdge = Edge;

type WorkflowState = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNode: WorkflowNode | null;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  selectNode: (node: WorkflowNode | null) => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [{
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      label: "Example Node",
      params: {
        param1: "value1",
        param2: "value2",
      },
    },
  }],
  edges: [],
  selectedNode: null,

  onNodesChange: (changes) => {
    const updated = applyNodeChanges(changes, get().nodes) as WorkflowNode[];
    set({ nodes: updated });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  selectNode: (node) => set({ selectedNode: node }),
}));