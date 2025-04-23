import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const useSpotLightFollow = () => {
  const { camera } = useThree();
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const frameRef = useRef<number>(0); // Usamos uma ref para o frameId

  useEffect(() => {
    // Cria um objeto para ser o alvo da luz
    targetRef.current = new THREE.Object3D();
    camera.add(targetRef.current);

    return () => {
      if (targetRef.current) {
        camera.remove(targetRef.current);
      }
      cancelAnimationFrame(frameRef.current); // Limpa a animação ao desmontar
    };
  }, [camera]);

  useEffect(() => {
    if (!spotLightRef.current || !targetRef.current) return;

    const updateLight = () => {
      // Posiciona a luz na câmera (com pequeno offset para parecer mais natural)
      spotLightRef.current!.position.set(0, -0.2, 0);
      spotLightRef.current!.position.applyMatrix4(camera.matrixWorld);

      // Define o alvo 10m à frente da câmera
      targetRef.current!.position.set(0, 0, -10);
      targetRef.current!.position.applyMatrix4(camera.matrixWorld);

      spotLightRef.current!.target = targetRef.current;
    };

    const animate = () => {
      updateLight();
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [camera]);

  return spotLightRef;
};
