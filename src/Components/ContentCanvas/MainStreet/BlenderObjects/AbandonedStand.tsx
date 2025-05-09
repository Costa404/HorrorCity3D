import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const AbandonedStand = () => {
  const { scene } = useGLTF("src/assets/stand.glb");

  // Cria uma referência para o grupo
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      // Marca o grupo e todos os seus filhos como prédios
      groupRef.current.traverse((child) => {
        child.userData.isBuilding = true;
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={[-55, 0, -60]}>
      <RigidBody type="fixed" scale={[1.3, 1.3, 1.3]} colliders="trimesh">
        <StreetLight position={[12.5, -3, -2]} rotation={[0, Math.PI / 2, 0]} />
        <StreetLight position={[12.5, 0, -30]} rotation={[0, Math.PI / 2, 0]} />
        <primitive object={scene} />
      </RigidBody>
    </group>
  );
};

export default AbandonedStand;
