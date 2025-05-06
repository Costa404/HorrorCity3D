import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";
import { useEffect, useRef } from "react";
import * as THREE from "three";
const DemageBuilding = () => {
  const { scene } = useGLTF("src/assets/demageBuilding.glb");
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
    <group ref={groupRef} position={[-100, -3, 100]}>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene} />
      </RigidBody>
      <StreetLight position={[0, 0, -2]} rotation={[0, 0, 0]} />
    </group>
  );
};
export default DemageBuilding;
