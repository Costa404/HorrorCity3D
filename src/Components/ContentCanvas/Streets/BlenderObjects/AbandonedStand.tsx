import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import StreetLight from "./StreetLightGroup/StreetLight";

import { useMemo } from "react";

interface AbandonedStandProps {
  position: [number, number, number];
}

const AbandonedStand: React.FC<AbandonedStandProps> = ({ position }) => {
  const { scene } = useGLTF("src/assets/stand.glb");

  // Faz clone da cena para evitar bugs com múltiplas instâncias
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <group position={position}>
      <RigidBody type="fixed" scale={[1.3, 1.3, 1.3]} colliders="trimesh">
        <StreetLight position={[12.5, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
        <StreetLight position={[12.5, 0, -30]} rotation={[0, Math.PI / 2, 0]} />
        <primitive object={clonedScene} />
      </RigidBody>
    </group>
  );
};

export default AbandonedStand;
