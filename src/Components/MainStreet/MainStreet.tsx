import Building from "./BlenderObjects/Building";
import HouseWithGarden from "./BlenderObjects/HouseWithGarden";

import { useRef } from "react";
import * as THREE from "three";

import StreetLightGroup from "./StreetLightGroup/StreetLightGroup";
import TrashContainerGroup from "./TrashContainerGroup/TrashContainerGroup";

const MainStreet = () => {
  const characterRef = useRef<THREE.Group>(null);

  return (
    <group ref={characterRef} position={new THREE.Vector3(0, 0, 0)}>
      {" "}
      {/* <Road road="src/assets/road.glb" /> */}
      <Building position={[100, 0, 50]} />
      <Building position={[0, 0, 0]} />
      <Building position={[50, 0, -100]} />
      <Building position={[-100, 0, 0]} />
      <HouseWithGarden />
      {/* <StreetLightGroup /> */}
      <TrashContainerGroup />
    </group>
  );
};

export default MainStreet;
