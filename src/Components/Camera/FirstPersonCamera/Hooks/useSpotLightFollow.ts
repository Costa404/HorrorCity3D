import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const useSpotLightFollow = () => {
  const { camera } = useThree();
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const frameRef = useRef<number>(0);
  useEffect(() => {
    targetRef.current = new THREE.Object3D();
    camera.add(targetRef.current);

    return () => {
      if (targetRef.current) {
        camera.remove(targetRef.current);
      }
      cancelAnimationFrame(frameRef.current);
    };
  }, [camera]);

  useEffect(() => {
    if (!spotLightRef.current || !targetRef.current) return;

    const updateLight = () => {
      spotLightRef.current!.position.set(0, -0.2, 0);
      spotLightRef.current!.position.applyMatrix4(camera.matrixWorld);

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
