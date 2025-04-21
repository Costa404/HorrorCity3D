import { useRef } from "react";
import { Group } from "three";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box, Environment, OrbitControls } from "@react-three/drei";

import MainStreet from "./MainStreet/MainStreet";

import MainCharacter from "./MainCharacter/MainCharacter";
import FirstPersonCamera from "./Camera/FirstPersonCamera";
import SkyWithSun from "./Utility/SkyWithSun";
import CityFloorAndWalls from "./Utility/CityFloorAndWalls";

const MyCity = () => {
  const characterRef = useRef<Group | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 100, 300], fov: 60 }} shadows>
        <Physics gravity={[0, -9.81, 0]} debug>
          <Environment files="src/assets/bgMilkyWay.jpg" background />
          <SkyWithSun />
          {/* <ThirdPersonCamera target={characterRef} /> */}
          {/* <FirstPersonCamera /> */}
          <OrbitControls />
          <MainCharacter ref={characterRef} position={[0, 0, 0]} />
          <MainStreet />
          <CityFloorAndWalls />

          <RigidBody position={[0, 50, 0]} colliders="cuboid" canSleep={false}>
            <Box>
              <meshStandardMaterial color={"blue"} />
            </Box>
          </RigidBody>
        </Physics>
      </Canvas>
    </div>
  );
};

export default MyCity;
