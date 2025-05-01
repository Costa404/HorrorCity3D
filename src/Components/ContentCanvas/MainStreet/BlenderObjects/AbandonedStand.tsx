import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const AbandonedStand = () => {
  const { scene } = useGLTF("src/assets/stand.glb");
  return (
    <RigidBody
      type="fixed"
      position={[-50, 0, -50]}
      scale={[1.3, 1.3, 1.3]}
      colliders="trimesh"
    >
      <primitive object={scene} />
    </RigidBody>
  );
};

export default AbandonedStand;
