import Building from "./BlenderObjects/Building";

import { useRef } from "react";
import * as THREE from "three";

import AbandonedStand from "./BlenderObjects/AbandonedStand";
import Building2 from "./BlenderObjects/Building2";
import BuildingPoly from "./PolyObjetcs/BuildingPoly";
import { useGLTF } from "@react-three/drei";

const RightStreet = () => {
  const characterRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("src/assets/buildingPoly.glb");
  const { scene: sceneTwo } = useGLTF("src/assets/SkyBuildingPoly.glb");
  const { scene: sceneThree } = useGLTF("src/assets/building2Poly.glb");
  const { scene: sceneFour } = useGLTF("src/assets/Skyscraper.glb");
  const { scene: sceneFive } = useGLTF("src/assets/building5Poly.glb");

  return (
    <group ref={characterRef} position={new THREE.Vector3(0, 0, 0)}>
      <BuildingPoly
        position={[-80, 0, 80]}
        scene={scene}
        rotation={[0, Math.PI * 1.5, 0]}
      />
      <BuildingPoly
        position={[-80, 55, 20]}
        scene={sceneTwo}
        rotation={[0, Math.PI * 1.5, 0]}
        scale={[75, 75, 75]}
      />
      <BuildingPoly
        position={[-80, 0, -85]}
        scene={sceneThree}
        rotation={[0, Math.PI * 1.5, 0]}
      />

      <BuildingPoly
        position={[0, 0, 0]}
        scene={sceneFour}
        scale={[5, 5, 5]}
        rotation={[0, Math.PI * 1.5, 0]}
      />
      <BuildingPoly
        scale={[100, 100, 100]}
        position={[-80, 73, -30]}
        scene={sceneFive}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
};

export default RightStreet;
