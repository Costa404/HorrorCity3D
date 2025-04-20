import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface BuildingProps {
  building: string;
}

const Building: React.FC<BuildingProps> = ({ building }) => {
  const { scene } = useGLTF(building);

  return (
    <RigidBody type="fixed" position={[-23, -2, 0]} colliders="trimesh">
      <primitive object={scene} scale={[2, 2, 2]} />
    </RigidBody>
  );
};

export default Building;
