import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";
const Building2 = () => {
  const { scene } = useGLTF("src/assets/building2.glb");

  return (
    <group position={[80, -1, 0]}>
      <RigidBody type="fixed" colliders="trimesh" scale={[3, 3, 3]}>
        <primitive object={scene} />
      </RigidBody>

      <StreetLight position={[16.5, 1, 22]} rotation={[0, Math.PI, 0]} />
      <StreetLight position={[-23.2, 1, 22]} rotation={[0, Math.PI, 0]} />
      <StreetLight position={[16.5, 1, -24]} rotation={[0, Math.PI * 2, 0]} />
      <StreetLight position={[-23.2, 1, -24]} rotation={[0, Math.PI * 2, 0]} />
    </group>
  );
};
export default Building2;
