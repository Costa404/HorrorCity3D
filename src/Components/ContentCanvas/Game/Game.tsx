import { useThree } from "@react-three/fiber";
import { useEffect, useCallback } from "react";

import Enemy from "./Enemies/Enemy";
import { useShotCollision } from "./Gun/GunHooks/useShotCollision";
import ProximityDamage from "./Life/ProximityDamage";

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
      <ProximityDamage />
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} id={enemy.id} />
      ))}
    </>
  );
};

export default Game;
