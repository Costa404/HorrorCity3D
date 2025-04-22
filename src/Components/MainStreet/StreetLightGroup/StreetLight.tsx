import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const StreetLight = ({ position = [0, 0, 0] }) => {
  const { scene: originalScene } = useGLTF("src/assets/streetLight.glb");
  const groupRef = useRef();
  const sceneRef = useRef();

  //  Clona a cena uma vez quando o componente monta
  useEffect(() => {
    sceneRef.current = originalScene.clone();
  }, [originalScene]);

  useEffect(() => {
    if (!groupRef.current || !sceneRef.current) return;

    const lightTarget = sceneRef.current.getObjectByName("light_point");

    if (lightTarget) {
      const worldPos = new THREE.Vector3();
      lightTarget.getWorldPosition(worldPos);

      const light = groupRef.current.children.find(
        (child) => child.type === "PointLight"
      );
      if (light) {
        light.position.copy(worldPos);
      }
    }
  }, []);

  return (
    <RigidBody position={position} colliders="trimesh">
      <group ref={groupRef}>
        {sceneRef.current && <primitive object={sceneRef.current} />}
        <pointLight
          intensity={275}
          distance={100}
          decay={2.4}
          color="#ffffff"
        />
      </group>
    </RigidBody>
  );
};

export default StreetLight;
