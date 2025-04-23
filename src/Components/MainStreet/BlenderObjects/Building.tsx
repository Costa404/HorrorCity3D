import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import StreetLight from "../StreetLightGroup/StreetLight";
import TrashContainer from "../TrashContainerGroup/TrashContainer";

interface BuildingProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

const Building: React.FC<BuildingProps> = ({
  position,
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF("src/assets/building1.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position} rotation={rotation}>
      {/* RigidBody só do prédio */}
      <RigidBody colliders="trimesh">
        <primitive object={clonedScene} scale={[2, 2, 2]} ref={meshRef} />
      </RigidBody>
      {/* Objetos com física independentes, mas posicionados em relação ao prédio */}
      <StreetLight position={[14, 0, 30]} rotation={[0, Math.PI * 1.5, 0]} />
      <StreetLight position={[14, 0, 1]} rotation={[0, Math.PI * 1.5, 0]} />
      <StreetLight position={[-18, 0, 31]} rotation={[0, Math.PI / 2, 0]} />
      <StreetLight position={[-18, 0, 2.5]} rotation={[0, Math.PI / 2, 0]} />

      <TrashContainer position={[-17.1, 22.3, 27]} rotation={[0, Math.PI, 0]} />
      <TrashContainer position={[-17.1, 22.3, 5]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

export default Building;
