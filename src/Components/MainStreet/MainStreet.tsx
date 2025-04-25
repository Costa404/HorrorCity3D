import Building from "./BlenderObjects/Building";
import HouseWithGarden from "./BlenderObjects/HouseWithGarden";

import { useRef } from "react";
import * as THREE from "three";

import StreetLightGroup from "./StreetLightGroup/StreetLightGroup";
import TrashContainerGroup from "./TrashContainerGroup/TrashContainerGroup";
import DemageBuilding from "./BlenderObjects/DemageBuilding";

const MainStreet = () => {
  const characterRef = useRef<THREE.Group>(null);

  return (
    <group ref={characterRef} position={new THREE.Vector3(0, 0, 0)}>
      {" "}
      {/* <Road road="src/assets/road.glb" /> */}
      <Building
        id="building-1"
        position={[0, 0, -20]}
        rotation={[0, Math.PI, 0]}
      />
      <Building id="building-2" position={[80, 0, 50]} />
      <Building id="building-3" position={[80, 0, -50]} />
      <Building
        id="building-4"
        position={[0, 0, 80]}
        rotation={[0, Math.PI, 0]}
      />
      <HouseWithGarden />
      <DemageBuilding />
      <StreetLightGroup />
    </group>
  );
};

export default MainStreet;
