import { useRef } from "react";
import { Group, Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box, Environment, OrbitControls } from "@react-three/drei";

import MainStreet from "./MainStreet/MainStreet";
import * as THREE from "three";
import MainCharacter from "./MainCharacter/MainCharacter";

import SkyWithSun from "./Utility/SkyWithSun";
import CityFloorAndWalls from "./Utility/CityFloorAndWalls";
import Enemy from "./Enemy/Enemy";
import FirstPersonCamera from "./Camera/FirstPersonCamera/FirstPersonCamera";

const MyCity = () => {
  const characterRef = useRef<Group | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 100, 300], fov: 60 }} shadows>
        <Physics gravity={[0, -9.81, 0]}>
          {/* <Environment files="src/assets/bgMilkyWay.jpg" background /> */}
          <SkyWithSun />
          {/* <ThirdPersonCamera target={characterRef} /> */}
          <FirstPersonCamera />
          {/* <OrbitControls /> */}
          {/* <MainCharacter ref={characterRef} position={[0, 50, 100]} /> */}
          <MainStreet />
          <CityFloorAndWalls />
          <Enemy />
        </Physics>
      </Canvas>
    </div>
  );
};

export default MyCity;
// near: 1, far: 20000
