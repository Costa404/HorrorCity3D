import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface TrashContainerCameraProps {
  targetPosition: THREE.Vector3;
}

const TrashContainerCamera = ({
  targetPosition,
}: TrashContainerCameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      const offset = new THREE.Vector3(2, 20, 5);
      const newPos = targetPosition.clone().add(offset);
      cameraRef.current.position.copy(newPos);
      cameraRef.current.lookAt(targetPosition);
    }
  }, [targetPosition]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={60}
      near={0.1}
      far={1000}
    />
  );
};

export default TrashContainerCamera;
