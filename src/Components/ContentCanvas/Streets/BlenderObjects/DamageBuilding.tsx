import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";

const DamageBuilding = () => {
  const { scene } = useGLTF("src/assets/damageBuilding.glb");

  return (
    <group position={[-70, -1, 60]}>
      <RigidBody type="fixed" colliders="trimesh" scale={[3, 3, 3]}>
        <primitive object={scene} />
      </RigidBody>
      <StreetLight position={[0, 1, -2]} rotation={[0, 0, 0]} />
    </group>
  );
};
export default DamageBuilding;
