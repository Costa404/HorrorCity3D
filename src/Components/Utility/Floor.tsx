import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export function UrbanFloor() {
  const { scene } = useGLTF("src/assets/geralFloor.glb"); 

  return (
    <RigidBody type="fixed" colliders="cuboid" position={[0, 0.3,
     0]}>
      <primitive object={scene} />
    </RigidBody>
  );
}
