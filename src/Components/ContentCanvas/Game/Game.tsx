import { useThree } from "@react-three/fiber";
import { useEffect, useCallback, useRef } from "react";
import useShotCollision from "./Gun/GunHooks/useShotCollision";

import Enemy from "./Enemies/Enemy";

const Game = () => {
  const { camera, scene } = useThree();

  const { handleShoot, enemies } = useShotCollision(camera, scene);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button === 0) handleShoot();
    },
    [handleShoot]
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [handleMouseDown]);

  return (
    <>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} id={enemy.id} />
      ))}
    </>
  );
};

export default Game;
