import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Rede = () => {
  const { scene } = useGLTF("src/assets/rede.glb");
  return (
    <RigidBody type="fixed" position={[-100, 0.3, 0]} colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
};

export default Rede;
