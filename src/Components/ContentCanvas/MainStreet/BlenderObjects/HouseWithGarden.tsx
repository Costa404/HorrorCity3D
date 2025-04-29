import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const HouseWithGarden = () => {
  const { scene } = useGLTF("src/assets/alien.glb");
  return (
    <RigidBody type="fixed" position={[-50, 0, -50]} colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
};

export default HouseWithGarden;
