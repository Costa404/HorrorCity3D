import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGunStore } from "./GunHooks/useGunStore";

const Deagle = () => {
  const { camera, scene } = useThree();
  const deagleGroup = useRef<THREE.Group>(new THREE.Group());
  const { scene: model } = useGLTF("src/assets/deagle.glb");

  // Aqui usas o Zustand para saber se está a disparar
  const isShooting = useGunStore((s) => s.isShooting);
  const stopShooting = useGunStore((s) => s.stopShooting);

  const recoilOffset = useRef(0);
  const recoilTarget = useRef(0);

  useEffect(() => {
    const deagle = deagleGroup.current;
    scene.add(deagle);
    return () => {
      scene.remove(deagle);
    };
  }, [scene]);

  // Recoil trigger
  useEffect(() => {
    if (isShooting) {
      recoilTarget.current = 0.2;

      // Para garantir que o estado volta a false depois do tiro
      setTimeout(() => stopShooting(), 100); // ou 50ms, conforme o efeito
    }
  }, [isShooting]);

  useFrame(() => {
    const group = deagleGroup.current;
    const cam = camera;

    group.position.copy(cam.position);
    group.quaternion.copy(cam.quaternion);

    group.translateX(1);
    group.translateY(-0.9);
    group.translateZ(-2.1 + recoilOffset.current); // Aplica recoil aqui

    // Interpolação suave do recoil
    recoilOffset.current += (recoilTarget.current - recoilOffset.current) * 0.2;
    recoilTarget.current *= 0.9; // efeito desaparece com o tempo
  });

  return (
    <primitive object={deagleGroup.current}>
      <primitive
        object={model}
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, 0, Math.PI]}
      />
    </primitive>
  );
};

export default Deagle;
