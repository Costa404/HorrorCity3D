import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import StreetLight from "../StreetLightGroup/StreetLight";

interface BuildingProps {
  position: [number, number, number];
}

const Building: React.FC<BuildingProps> = ({ position }) => {
  const { scene } = useGLTF("src/assets/building1.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <RigidBody position={position} colliders="trimesh">
      <primitive object={clonedScene} scale={[2, 2, 2]} ref={meshRef} />
      <StreetLight position={[15, 0, 10]} />
    </RigidBody>
  );
};

export default Building;
