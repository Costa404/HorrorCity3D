import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";

type Position = [number, number, number];

interface TrashContainerProps {
  position: Position;
}

const TrashContainer = ({ position }: TrashContainerProps) => {
  const { scene } = useGLTF("src/assets/trashContainer.glb");

  // Clonar o modelo para permitir múltiplas instâncias
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <RigidBody position={position} colliders="trimesh">
      <primitive object={clonedScene} />
    </RigidBody>
  );
};

export default TrashContainer;
