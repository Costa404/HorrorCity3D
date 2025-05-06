import { useFrame } from "@react-three/fiber";
import { RefObject } from "react";
import * as THREE from "three";

interface UseMiniMapPlayerPosProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  camera: THREE.Camera;
  MAP_SIZE: number;
  scale: number;
}

export const useMiniMapPlayerPos = ({
  canvasRef,
  camera,
  MAP_SIZE,
  scale,
}: UseMiniMapPlayerPosProps) => {
  useFrame(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      MAP_SIZE / 2 + camera.position.x * scale,
      MAP_SIZE / 2 + camera.position.z * scale,
      5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
};
