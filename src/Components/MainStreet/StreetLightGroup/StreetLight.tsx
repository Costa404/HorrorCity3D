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

  // Clone the scene to avoid mutating the original
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!groupRef.current) return;

    // Find the target object in the cloned scene
    const lightTarget = clonedScene.getObjectByName("light_point");
    if (!lightTarget) return;

    // Get the world position of the target
    const worldPos = new THREE.Vector3();
    lightTarget.getWorldPosition(worldPos);

    // Convert world position to the group's local space
    const localPos = worldPos.clone();
    groupRef.current.worldToLocal(localPos);

    // Find the point light in the group's children
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
