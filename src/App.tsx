import MyCity from "./Components/MyCity";
import { useOxygen } from "./Components/Utility/useOxygen";

const App = () => {
  useOxygen();
  return (
    <>
      <MyCity />
      {/* Mira no centro */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          fontSize: "32px",
          color: "white",
        }}
      >
        +
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "200px",
          height: "20px",
          background: "#333",
          border: "2px solid white",
          borderRadius: "5px",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div
          id="oxygen-bar"
          style={{
            height: "100%",
            width: "100%", // começa cheio
            background: "deepskyblue",
            transition: "width 0.3s",
          }}
        ></div>
      </div>
    </>
  );
};

export default App;
