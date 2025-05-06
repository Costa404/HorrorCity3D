import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import MainStreet from "./MainStreet/MainStreet";
import SkyWithSun from "./UiCanvas/SkyWithSun";
import CityFloorAndWalls from "./UiCanvas/CityFloorAndWalls";
import Game from "./Game/Game";
import Cameras from "./UiCanvas/Cameras";
import MunitionZone from "./Game/UtilityGame/MunitionZone";
import { Html, OrbitControls } from "@react-three/drei";
import { useStartGameStore } from "../useStartGameStore";
import MiniMap2D from "./MiniMap2D/MiniMap2D";

const MyCity = () => {
  // const characterRef = useRef<Group | null>(null);
  const showGameScene = useStartGameStore((state) => state.showGameScene);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 100, 300], fov: 60 }}
        shadows
        style={{
          visibility: showGameScene ? "visible" : "hidden",
          transition: "visibility 0s 0.5s",
        }}
      >
        <Physics gravity={[0, -9.81, 0]}>
          {/* <Environment files="src/assets/bgMilkyWay.jpg" background /> */}
          <SkyWithSun />
          {/* <ThirdPersonCamera target={characterRef} /> */}
          {/* <FirstPersonCamera /> */}
          {/* <OrbitControls /> */}
          <Cameras />

          <MainStreet />
          <CityFloorAndWalls />
          <Game />
          {/* <EnemyCharacter position={[0, 1, 0]} /> */}

          <MunitionZone />
        </Physics>
        <MiniMap2D />
      </Canvas>
    </div>
  );
};

export default MyCity;
// near: 1, far: 20000
