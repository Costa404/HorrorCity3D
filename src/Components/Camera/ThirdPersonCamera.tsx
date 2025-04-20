import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useCameraStore } from "./useCameraStore";
import * as THREE from "three";

export const ThirdPersonCamera = () => {
  const { camera } = useThree();
  const { target } = useCameraStore();
  const offset = new THREE.Vector3(0, 4, -10); 
  const currentPosition = new THREE.Vector3();

  useFrame(() => {
    if (!target) return;

    const targetPosition = new THREE.Vector3()
      .copy(target.position)
      .add(offset);

    currentPosition.lerp(targetPosition, 0.1);
    camera.position.copy(currentPosition);

    camera.lookAt(target.position);
  });

  return null;
};
