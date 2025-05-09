import { useFrame } from "@react-three/fiber";
import { RefObject } from "react";
import * as THREE from "three";
import { useEnemyPositionStore } from "../Game/Enemies/EnemyCharacter/Hooks/useEnemyPosStore";

interface UseMiniMapEnemiesPosProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  MAP_SIZE: number;
  scale: number;
}

export const useMiniMapEnemiesPos = ({
  canvasRef,
  MAP_SIZE,
  scale,
}: UseMiniMapEnemiesPosProps) => {
  const enemiesPosition = useEnemyPositionStore((s) => s.enemiesPosition);
  // console.log("enemiesposition", enemiesPosition);

  useFrame(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    //  Basta ter um clear em cada canvas
    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

    // converte o objeto enemiesPosition em um array de objetos
    const enemiesArray = Object.values(enemiesPosition);

    enemiesArray.forEach((enemy) => {
      const { x, z } = enemy;

      ctx.fillStyle = "green";
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
