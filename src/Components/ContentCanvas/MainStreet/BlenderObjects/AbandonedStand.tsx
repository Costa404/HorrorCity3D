import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";

const AbandonedStand = () => {
  const { scene } = useGLTF("src/assets/stand.glb");
  return (
    <group position={[-55, 0, -60]}>
      <RigidBody type="fixed" scale={[1.3, 1.3, 1.3]} colliders="trimesh">
        <StreetLight position={[12.5, -3, -2]} rotation={[0, Math.PI / 2, 0]} />
        <StreetLight position={[12.5, 0, -30]} rotation={[0, Math.PI / 2, 0]} />

        <primitive object={scene} />
      </RigidBody>
    </group>
  );
};

export default AbandonedStand;
