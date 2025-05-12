import { useFrame } from "@react-three/fiber";
import { RefObject } from "react";

import { useEnemyPositionStore } from "../Game/Enemies/EnemyCharacter/Hooks/useEnemyPosStore";
import { useEnemyStore } from "../Game/Enemies/EnemyCharacter/Hooks/useEnemyStore";

interface MiniMapEnemyPosProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  MAP_SIZE: number;
  scale: number;
}

export const useMiniMapEnemyPos = ({
  canvasRef,
  MAP_SIZE,
  scale,
}: MiniMapEnemyPosProps) => {
  const enemiesPosition = useEnemyPositionStore((s) => s.enemiesPosition);
  const { enemies } = useEnemyStore();

  useFrame(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

    Object.entries(enemiesPosition).forEach(([id, pos]) => {
      const enemy = enemies.find((e) => e.id === id);
      if (!enemy) return;

      const { x, z } = pos;

      // Verde se a life for superior a 50%, amarelo se for menos de 50%. Se tiver 0 simplesmente desaparece.
      ctx.fillStyle = enemy.Life > 50 ? "green" : "yellow";

      ctx.beginPath();
      ctx.arc(
        MAP_SIZE / 2 + x * scale,
        MAP_SIZE / 2 + z * scale,
        5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  });
};
