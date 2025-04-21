import Building from "./BlenderObjects/Building";
import HouseWithGarden from "./BlenderObjects/HouseWithGarden";

import { useRef } from "react";
import * as THREE from "three";

const MainStreet = () => {
  const characterRef = useRef<THREE.Group>(null);

  return (
    <group ref={characterRef} position={new THREE.Vector3(0, 0, 0)}>
      {" "}
      {/* <Road road="src/assets/road.glb" /> */}
      <Building building="src/assets/building1.glb" />
      <HouseWithGarden />
    </group>
  );
};

export default MainStreet;
