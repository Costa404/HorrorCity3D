import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMiniMapPlayerPos } from "./usePlayerPosMiniMap";
import { useMiniMapEnemyPos } from "./useEnemyPosMiniMap";

const MiniMap2D = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { camera } = useThree();

  const MAP_SIZE = 200;
  const WORLD_SIZE = 250;
  const scale = MAP_SIZE / WORLD_SIZE;

  // // Funções para  os buildings e minimapa
  // useMiniMapEnemiesPos({
  //   canvasRef,
  //   enemies, // ← Aqui você passa a lista para o hook
  //   MAP_SIZE,
  //   scale: scale,
  // });
  useMiniMapEnemyPos({
    canvasRef,
    MAP_SIZE,
    scale,
  });

  useMiniMapPlayerPos({ canvasRef, camera, MAP_SIZE, scale });
  return (
    <Html
      style={{
        position: "absolute",
        bottom: "-200px",
        right: "-200px",
        width: `${MAP_SIZE}px`,
        height: `${MAP_SIZE}px`,
      }}
      calculatePosition={(el, camera, size) => {
        return [size.width - MAP_SIZE - 20, size.height - MAP_SIZE - 20];
      }}
    >
      <canvas
        ref={canvasRef}
        width={MAP_SIZE}
        height={MAP_SIZE}
        style={{
          border: "2px solid white",
          borderRadius: "8px",
        }}
      />
    </Html>
  );
};

export default MiniMap2D;
