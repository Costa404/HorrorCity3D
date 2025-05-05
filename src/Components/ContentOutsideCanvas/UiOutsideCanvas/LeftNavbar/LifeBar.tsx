const LifeBar = () => {
  return (
    <div
      className="position-absolute top-0 start-0 mt-3 ms-3 border border-white rounded"
      style={{
        width: "200px",
        height: "20px",
        background: "#333",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      <div
        id="life-bar"
        className="bg-danger h-100"
        style={{
          width: "100%",
          transition: "width 0.3s",
        }}
      ></div>
    </div>
  );
};

export default LifeBar;
