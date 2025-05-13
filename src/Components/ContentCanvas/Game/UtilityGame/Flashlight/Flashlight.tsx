import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFlashlightStore } from "./useFlashlightStore";

const Flashlight = () => {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { camera } = useThree();
  const isFlashlightOn = useFlashlightStore((s) => s.isFlashlightOn);
  const toggleFlashlight = useFlashlightStore((s) => s.toggleFlashlight);

  // Evento de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "e") {
        event.preventDefault();
        toggleFlashlight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFlashlight]);

  useFrame(() => {
    if (!lightRef.current) return;

    lightRef.current.position.copy(camera.position);

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    lightRef.current.target.position.copy(
      camera.position.clone().add(direction)
    );
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      {isFlashlightOn && (
        <spotLight
          ref={lightRef}
          angle={0.3}
          intensity={500}
          distance={200}
          decay={2}
          penumbra={0.9}
          color="white"
        />
      )}
      <object3D />
    </>
  );
};

export default Flashlight;
