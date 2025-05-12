import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Flashlight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;

    // Coloca a luz na posição da câmera
    lightRef.current.position.copy(camera.position);

    // Define a direção da luz com base na direção da câmera
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    lightRef.current.target.position.copy(
      camera.position.clone().add(direction)
    );
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <spotLight
        ref={lightRef}
        angle={0.3}
        intensity={500}
        distance={200}
        decay={2}
        penumbra={0.9}
        color="white"
      />
      <object3D />
    </>
  );
}
