import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import StreetLight from "./StreetLightGroup/StreetLight";
import TrashContainer from "./TrashContainerGroup/TrashContainer";
import { LadderZoneTrigger } from "../../Game/UtilityGame/ClimbingLadder/LadderTrigger";

interface BuildingProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  buildingIndex?: number;
}

const Building: React.FC<BuildingProps> = ({
  position,
  rotation = [0, 0, 0],
  buildingIndex = 0,
}) => {
  const { scene } = useGLTF("src/assets/building1.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef<THREE.Mesh>(null);

  const trashPositions: [number, number, number][] = [
    [-25, 0.3, 42],
    [-25, 0.3, 6],
  ];

  return (
    <group position={position} rotation={rotation}>
      <RigidBody colliders="trimesh" type="fixed">
        <primitive object={clonedScene} scale={[3, 3, 3]} ref={meshRef} />
      </RigidBody>
      <LadderZoneTrigger position={[-21.5, 30, 47]} type="bottom" />
      <LadderZoneTrigger position={[-21.5, 1.5, 47]} type="top" />

      {/* <LadderTopTrigger position={[-21.5, 30, 47]} />
      <LadderTopTrigger position={[-21.5, 1.5, 47]} /> */}
      <StreetLight position={[18, 0, 45.5]} rotation={[0, Math.PI * 1.5, 0]} />
      <StreetLight position={[18, 0, 1.5]} rotation={[0, Math.PI * 1.5, 0]} />
      <StreetLight position={[-24, 0, 46.5]} rotation={[0, Math.PI / 2, 0]} />
      <StreetLight position={[-24, 0, 2.5]} rotation={[0, Math.PI / 2, 0]} />
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
