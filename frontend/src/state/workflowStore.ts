import { create } from "zustand";
import type { Node, Edge, NodeChange, EdgeChange } from 'reactflow';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import type { WorkflowNodeData } from "../types/nodes";

type WorkflowState = {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNode: Node<WorkflowNodeData> | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  selectNode: (node: Node<WorkflowNodeData> | null) => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  onNodesChange: (changes) => {
    const updatedNodes = applyNodeChanges(changes, get().nodes);
    set({ nodes: updatedNodes });
  },

  onEdgesChange: (changes) => {
    const updatedEdges = applyEdgeChanges(changes, get().edges);
    set({ edges: updatedEdges });
  },

  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
  selectNode: (node: Node | null) => set({ selectedNode: node }),
}));