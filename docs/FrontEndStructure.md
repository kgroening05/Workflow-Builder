frontend/
├── src/
│   ├── components/
│   │   ├── graph/
│   │   │   ├── WorkflowCanvas.tsx
│   │   │   ├── NodeRenderer.tsx
│   │   │   ├── EdgeRenderer.tsx
│   │   │   └── MiniMap.tsx
│   │   ├── panels/
│   │   │   ├── NodeConfigPanel.tsx
│   │   │   └── RunResultsPanel.tsx
│   │   ├── sidebar/
│   │   │   └── NodePalette.tsx
│   │   └── layout/
│   │       └── AppLayout.tsx
│   │
│   ├── pages/
│   │   └── WorkflowEditorPage.tsx
│   │
│   ├── state/
│   │   ├── workflowStore.ts
│   │   └── uiStore.ts
│   │
│   ├── api/
│   │   ├── client.ts
│   │   ├── workflows.ts
│   │   ├── execute.ts
│   │   └── ai.ts
│   │
│   ├── types/
│   │   ├── workflow.ts
│   │   ├── nodes.ts
│   │   └── api.ts
│   │
│   ├── utils/
│   │   ├── validators.ts
│   │   └── graphHelpers.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
└── index.html