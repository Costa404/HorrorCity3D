import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";

const DemageBuilding = () => {
  const { scene } = useGLTF("src/assets/demageBuilding.glb");
  return (
    <group position={[-100, 0, 100]}>
      <RigidBody colliders="trimesh">
        <primitive object={scene} />
      </RigidBody>
      <StreetLight position={[0, 0, -2]} rotation={[0, 0, 0]} />
    </group>
  );
};

export default DemageBuilding;
