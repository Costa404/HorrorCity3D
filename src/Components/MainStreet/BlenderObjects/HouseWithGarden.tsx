import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const HouseWithGarden = () => {
  const { scene } = useGLTF("src/assets/rede.glb");
  return (
    <RigidBody position={[-100, 0, -100]} colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
};

export default HouseWithGarden;
