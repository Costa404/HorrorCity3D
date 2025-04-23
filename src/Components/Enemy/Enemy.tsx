import { RigidBody, BallCollider } from "@react-three/rapier";
import { useRef, useState } from "react";
import { usePlayerStore } from "../Camera/FirstPersonCamera/Hooks/useCameraStore";

const Enemy = () => {
  const enemyRef = useRef<ReturnType<typeof RigidBody> | null>(null);
  // console.log("enemyRef", enemyRef);

  const [gameOver, setGameOver] = useState(false);

  const playerRef = usePlayerStore((state) => state.playerRef);
  // console.log("player", playerRef);

  const handleEnter = () => {
    if (!enemyRef.current || !playerRef?.current) return;

    const enemyPos = enemyRef.current.translation();
    const playerPos = playerRef.current.translation();

    if (!enemyPos || !playerPos) return;

    const distance = Math.sqrt(
      (enemyPos.x - playerPos.x) ** 2 +
        (enemyPos.y - playerPos.y) ** 2 +
        (enemyPos.z - playerPos.z) ** 2
    );

    console.log("Distância:", distance);

    if (distance < 3) {
      console.warn("GAME OVER 🔥");
      setGameOver(true);
    }
  };

  return (
    <RigidBody ref={enemyRef} type="fixed" position={[0, 1.6, 0]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={gameOver ? "red" : "purple"} />
      </mesh>

      <BallCollider args={[3]} sensor onIntersectionEnter={handleEnter} />
    </RigidBody>
  );
};

export default Enemy;
