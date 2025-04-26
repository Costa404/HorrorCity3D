import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const HouseWithGarden = () => {
  const { scene } = useGLTF("src/assets/stand.glb");
  return (
    <RigidBody type="fixed" position={[-50, 0, -100]} colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
};

export default HouseWithGarden;
