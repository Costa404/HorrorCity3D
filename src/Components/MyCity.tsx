import { useRef } from "react";
import { Group } from "three";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, OrbitControls } from "@react-three/drei";

import MainStreet from "./MainStreet/MainStreet";
import SkyWithSun from "./Utility/SkyWithSun";
import { UrbanFloor } from "./Utility/Floor";
import FirstPersonCamera from "./Camera/FirstPersonCamera";
import MainCharacter from "./MainChapter/MainCharacter";
import {
  GTACamera,
  HybridCamera,
  ThirdPersonCamera,
} from "./Camera/ThirdPersonCamera";

const MyCity = () => {
  const characterRef = useRef<Group | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 100, 300], fov: 60, near: 1, far: 20000 }}
        shadows
      >
        <Physics gravity={[0, -9.81, 0]}>
          <Environment files="src/assets/nightsky.exr" background />
          <SkyWithSun />
          {/* <ThirdPersonCamera target={characterRef} /> */}
          {/* <FirstPersonCamera /> */}
          <OrbitControls />
          <MainCharacter ref={characterRef} position={[0, 0, 0]} />
          <MainStreet />
          <UrbanFloor />
        </Physics>
      </Canvas>
    </div>
  );
};

export default MyCity;
