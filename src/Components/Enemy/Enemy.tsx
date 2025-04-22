import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei"; // Aqui mantemos o Box do Drei

import { Vector3 } from "three";
import { useEnemyMovement } from "./useEnemyMovement";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

// Props: recebe a posição inicial e uma referência à posição do personagem
const Enemy = ({
  initialPosition,
  getTargetPosition, // função que retorna Vector3 do personagem principal
}: {
  initialPosition: [number, number, number];
  getTargetPosition: () => Vector3;
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { moveEnemy } = useEnemyMovement();

  useFrame(() => {
    const body = rigidBodyRef.current;
    if (body) {
      const targetPos = getTargetPosition();
      moveEnemy(body, targetPos);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      colliders="cuboid"
      position={initialPosition}
      enabledRotations={[false, false, false]}
    >
      {/* Aqui estamos usando uma caixa simples */}
      <Box>
        <meshStandardMaterial color={"blue"} />
      </Box>
    </RigidBody>
  );
};

export default Enemy;
