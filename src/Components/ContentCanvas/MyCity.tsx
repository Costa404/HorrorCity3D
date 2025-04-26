import { useRef } from "react";
import { Group } from "three";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import MainStreet from "./MainStreet/MainStreet";
import * as THREE from "three";

import SkyWithSun from "./Utility/SkyWithSun";
import CityFloorAndWalls from "./Utility/CityFloorAndWalls";

import Cameras from "./Utility/Cameras";

import { OxygenTank } from "./Utility/OxxygenTank";
import Game from "./Game/Game";
import { OrbitControls } from "three-stdlib";
import MunitionZone from "./Game/Gun/Munition/MunitionZone";

const MyCity = () => {
  const characterRef = useRef<Group | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 100, 300], fov: 60 }} shadows>
        <Physics gravity={[0, -9.81, 0]}>
          {/* <Environment files="src/assets/bgMilkyWay.jpg" background /> */}
          <SkyWithSun />
          {/* <ThirdPersonCamera target={characterRef} /> */}
          {/* <FirstPersonCamera /> */}
          {/* <OrbitControls /> */}
          <Cameras />
          {/* <MainCharacter ref={characterRef} position={[0, 50, 100]} /> */}
          <MainStreet />
          <CityFloorAndWalls />
          <Game />
          <MunitionZone />
          {/* <OxygenTank position={[20, 0.5, -3]} playerRef={characterRef} /> */}
        </Physics>
      </Canvas>
    </div>
  );
};

export default MyCity;
// near: 1, far: 20000
