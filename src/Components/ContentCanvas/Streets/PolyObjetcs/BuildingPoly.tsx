import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "@react-three/fiber";
import { Object3D } from "three";

type BuildingPolyProps = {
  position?: Vector3;
  scene: Object3D;
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

const BuildingPoly = ({
  position = [0, 0, 0],
  scene,
  rotation = [0, 0, 0],
  scale = [30, 30, 30],
}: BuildingPolyProps) => {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="trimesh" scale={scale}>
        <primitive object={scene} />
      </RigidBody>
    </group>
  );
};

export default BuildingPoly;
