import Building from "./BlenderObjects/Building";

import { useRef } from "react";
import * as THREE from "three";

import AbandonedStand from "./BlenderObjects/AbandonedStand";
import Building2 from "./BlenderObjects/Building2";

const LeftStreet = () => {
  const characterRef = useRef<THREE.Group>(null);

  return (
    <group ref={characterRef} position={new THREE.Vector3(0, 0, 0)}>
      <Building position={[80, 0, 50]} />
      <Building position={[80, 0, -100]} />

      <AbandonedStand position={[20, 0.5, -50]} />
      <AbandonedStand position={[20, 0.5, 80]} />

      <Building2 />
    </group>
  );
};

export default LeftStreet;
