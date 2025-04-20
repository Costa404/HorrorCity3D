import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface RoadProps {
  road: string;
}

const Road: React.FC<RoadProps> = ({ road }) => {
  const { scene } = useGLTF(road);
  return (
    <RigidBody type="fixed" position={[0, -1, 0]} colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
};

export default Road;
