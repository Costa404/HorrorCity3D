import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import StreetLight from "../StreetLightGroup/StreetLight";
import TrashContainer from "../TrashContainerGroup/TrashContainer";

interface BuildingProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  buildingIndex: number;
}

const Building: React.FC<BuildingProps> = ({
  position,
  rotation = [0, 0, 0],
  buildingIndex = 0, // valor padrão caso não seja passado
}) => {
  const { scene } = useGLTF("src/assets/building1.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef<THREE.Mesh>(null);

  const trashPositions: [number, number, number][] = [
    [-18, 0, 27],
    [-18, 0, 4.5],
  ];

  return (
    <group position={position} rotation={rotation}>
      <RigidBody colliders="trimesh">
        <primitive object={clonedScene} scale={[2, 2, 2]} ref={meshRef} />
      </RigidBody>

      <StreetLight position={[14, 0, 30]} rotation={[0, Math.PI * 1.5, 0]} />
      <StreetLight position={[14, 0, 1]} rotation={[0, Math.PI * 1.5, 0]} />
      <StreetLight position={[-18, 0, 31]} rotation={[0, Math.PI / 2, 0]} />
      <StreetLight position={[-18, 0, 2.5]} rotation={[0, Math.PI / 2, 0]} />

      {trashPositions.map((pos, index) => {
        const trashId = `building${buildingIndex}_trash${index}`;
        return (
          <TrashContainer
            key={trashId}
            id={trashId}
            position={pos}
            rotation={[0, Math.PI, 0]}
          />
        );
      })}
    </group>
  );
};

export default Building;
