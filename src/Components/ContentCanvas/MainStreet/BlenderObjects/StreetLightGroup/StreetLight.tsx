import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface StreetLightProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const StreetLight = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: StreetLightProps) => {
  const { scene } = useGLTF("src/assets/streetLight.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Clonar o objeto para não modificar a instancia orignal
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!groupRef.current) return;

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
      // Update the light's position
      light.position.copy(localPos);
    }
  }, [clonedScene]);

  return (
    <RigidBody position={position} type="fixed" colliders="cuboid">
      <group ref={groupRef} rotation={rotation}>
        <primitive object={clonedScene} />
        <pointLight intensity={75} distance={50} decay={2.5} color="#ffffff" />
      </group>
    </RigidBody>
  );
};

export default StreetLight;
