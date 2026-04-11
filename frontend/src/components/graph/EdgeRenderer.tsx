import type { EdgeProps } from "reactflow";

export function EdgeRenderer(props: EdgeProps) {
  return <path {...props} stroke="black" />;
}