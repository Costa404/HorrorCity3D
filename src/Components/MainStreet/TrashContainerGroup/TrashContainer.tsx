import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface TrashContainerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const TrashContainer = ({ position, rotation }: TrashContainerProps) => {
  const { scene } = useGLTF("src/assets/trashContainer.glb");

  const groupRef = useRef<THREE.Group>(null);

  // Clona a cena antes do primeiro render
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <RigidBody
      position={position}
      rotation={rotation}
      type="dynamic"
      colliders="cuboid"
    >
      <group ref={groupRef}>
        <primitive object={clonedScene} />
      </group>
    </RigidBody>
  );
};

export default TrashContainer;
