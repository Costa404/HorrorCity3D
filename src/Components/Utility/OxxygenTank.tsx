import { useOxygen } from "./useOxygen";
import { useEffect } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

export const OxygenTank = ({
  position,
  playerRef,
}: {
  position: [number, number, number];
  playerRef: React.RefObject<RapierRigidBody>;
}) => {
  const { addOxygen } = useOxygen();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playerRef.current) return;

      const playerPos = playerRef.current.translation();
      const dx = playerPos.x - position[0];
      const dz = playerPos.z - position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < 1.5) {
        addOxygen(19);
        console.log("Oxigênio adicionado!");
        clearInterval(interval); // só pode ser usado uma vez
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <RigidBody type="fixed">
      <mesh position={position}>
        <cylinderGeometry args={[0.3, 0.3, 1, 12]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
    </RigidBody>
  );
};
