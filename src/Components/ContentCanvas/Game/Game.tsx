import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import EnemyCube from "./Enemies/Enemy";
import useHandleShot from "./Gun/GunHooks/useShotCollision";

const Game = () => {
  const { camera, scene } = useThree();
  const { handleShoot, enemies } = useHandleShot(camera, scene);

  // console.log("Inimigos vivos:", enemies);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) handleShoot();
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [handleShoot]);

  return (
    <>
      {enemies.map((enemy) => {
        return (
          <EnemyCube
            key={enemy.id}
            id={enemy.id}
            position={enemy.position}
            onHit={(id: string) => {
              console.log(`${id} morreu (via onHit)`);
            }}
          />
        );
      })}
    </>
  );
};

export default Game;
