import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import EnemyCube from "./UtilityGame/Enemy";
import useGame from "./UtilityGame/HooksGame/useGame";

const Game = () => {
  const { camera, scene } = useThree();
  const { enemies, handleShoot } = useGame(camera, scene);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) handleShoot();
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [handleShoot]);

  return (
    <>
      {enemies.map((enemy) => (
        <EnemyCube
          key={enemy.id}
          id={enemy.id}
          position={enemy.position}
          onHit={(id: string) => {
            console.log(`${id} morreu (via onHit)`);
          }}
        />
      ))}
    </>
  );
};

export default Game;
