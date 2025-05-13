import { useRef, useEffect } from "react";
import * as THREE from "three";

export const useStreetLightPosition = (clonedScene: THREE.Group | null) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current || !clonedScene) return;

    const lightTarget = clonedScene.getObjectByName("light_point");
    if (!lightTarget) return;

    const worldPos = new THREE.Vector3();
    lightTarget.getWorldPosition(worldPos);

    const localPos = worldPos.clone();
    groupRef.current.worldToLocal(localPos);

    const light = groupRef.current.children.find(
      (child): child is THREE.PointLight => child.type === "PointLight"
    );
    if (light) {
      // Atualiza a posição da luz
      light.position.copy(localPos);
    }
  }, [clonedScene]);

  return groupRef;
};
