import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { usePlayerStore } from "./usePlayerStore";
import * as THREE from "three";

export const SyncCameraWithPlayer = ({
  target,
}: {
  target: React.RefObject<RapierRigidBody>;
}) => {
  const { camera } = useThree();
  const cameraDirection = useRef(new THREE.Vector3());
  const setCameraDirection = usePlayerStore(
    (state) => state.setCameraDirection
  );

  useFrame(() => {
    if (!target.current) return;

    const position = target.current.translation();
    camera.position.set(position.x, position.y + 1.6, position.z);

    // Atualiza a direção da câmera para uso no movimento
    camera.getWorldDirection(cameraDirection.current);
    setCameraDirection(cameraDirection.current);
  });

  return null;
};
