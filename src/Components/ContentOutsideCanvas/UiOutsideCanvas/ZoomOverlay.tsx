const ZoomOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return (
    <div className="zoom-overlay">
      <div className="crosshair-horizontal" />
      <div className="crosshair-vertical" />
      <div className="crosshair-dot" />
    </div>
  );
};

export default ZoomOverlay;
