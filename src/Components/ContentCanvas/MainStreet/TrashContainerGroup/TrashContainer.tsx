import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useMemo, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useSwitchCameraStore } from "../../Camera/useSwitchCameraStore";
import { useCameraForTrashContainer } from "./useCameraForTrashContainer ";

interface TrashContainerProps {
  id: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const TrashContainer = ({ id, position, rotation }: TrashContainerProps) => {
  const { scene } = useGLTF("src/assets/trashContainer.glb");
  const cloned = useMemo(() => scene.clone(), [scene]);

  const [isInTrashContainer, setIsInTrashContainer] = useState(false);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const trashPosition = useMemo(
    () => new THREE.Vector3(...(position || [0, 0, 0])),
    [position]
  );

  useCameraForTrashContainer({
    cameraRef,
    isInTrashContainer,
    trashPosition,
  });

  const { setActiveCamera, setTrashPosition } = useSwitchCameraStore();

  useEffect(() => {
    setTrashPosition(id, trashPosition);
  }, [id, trashPosition, setTrashPosition]);

  const handleEnterZone = () => {
    console.log(`ENTROU na zona do lixo (${id})`);
    setActiveCamera("trashContainerView");
    setIsInTrashContainer(true);
  };

  return (
    <>
      <RigidBody
        position={position}
        rotation={rotation}
        type="fixed"
        colliders="cuboid"
      >
        <primitive object={cloned} />

        <CuboidCollider
          args={[2.2, 2.0, 3.2]}
          sensor
          onIntersectionEnter={handleEnterZone}
        />
      </RigidBody>
    </>
  );
};

export default TrashContainer;
