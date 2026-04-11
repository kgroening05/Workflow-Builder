export function NodePalette() {
  const nodeTypes = [
    { type: "csv_input", label: "CSV Input" },
    { type: "transform", label: "Transform" },
    { type: "summarize", label: "Summarize" },
  ];

  return (
    <div className="p-4 space-y-2">
      {nodeTypes.map((n) => (
        <div
          key={n.type}
          draggable
          className="p-2 border rounded cursor-grab bg-gray-50"
        >
          {n.label}
        </div>
      ))}
    </div>
  );
}