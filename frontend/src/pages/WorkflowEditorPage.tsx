import { AppLayout } from "../components/layout/AppLayout";
import { NodePalette } from "../components/sidebar/NodePalette";
import { WorkflowCanvas } from "../components/graph/WorkflowCanvas";
import { NodeConfigPanel } from "../components/panels/NodeConfigPanel";
import { RunResultsPanel } from "../components/panels/RunResultsPanel";
import { useUIStore } from "../state/uiStore";

export function WorkflowEditorPage() {
  const activePanel = useUIStore((s) => s.activePanel);

  return (
    <AppLayout
      sidebar={<NodePalette />}
      canvas={<WorkflowCanvas />}
      panel={activePanel === "config" ? <NodeConfigPanel /> : <RunResultsPanel />}
    />
  );
}