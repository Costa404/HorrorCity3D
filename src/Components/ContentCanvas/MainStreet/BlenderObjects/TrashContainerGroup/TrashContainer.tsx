import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";

interface TrashContainerProps {
  id: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const TrashContainer = ({ id, position, rotation }: TrashContainerProps) => {
  const { scene } = useGLTF("src/assets/trashContainer.glb");
  const cloned = useMemo(() => scene.clone(), [scene]);

  return (
    <>
      <RigidBody
        position={position}
        rotation={rotation}
        type="fixed"
        colliders="cuboid"
      >
        <primitive object={cloned} />
      </RigidBody>
    </>
  );
};

export default TrashContainer;
