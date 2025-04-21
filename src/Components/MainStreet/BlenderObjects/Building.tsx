import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import * as THREE from "three";

interface BuildingProps {
  building: string;
}

const Building: React.FC<BuildingProps> = ({ building }) => {
  const { scene } = useGLTF(building);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <RigidBody position={[0, 10, -100]} colliders="trimesh">
      <primitive object={scene} scale={[2, 2, 2]} ref={meshRef} />
    </RigidBody>
  );
};

export default Building;
