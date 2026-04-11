

export function AppLayout({ sidebar, canvas, panel }: { sidebar: React.ReactNode; canvas: React.ReactNode; panel: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-64 border-r">{sidebar}</div>
      <div className="flex-1 relative">{canvas}</div>
      <div className="w-80 border-l">{panel}</div>
    </div>
  );
}