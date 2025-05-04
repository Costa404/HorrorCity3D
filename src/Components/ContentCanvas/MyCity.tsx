import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import MainStreet from "./MainStreet/MainStreet";
import SkyWithSun from "./Utility/SkyWithSun";
import CityFloorAndWalls from "./Utility/CityFloorAndWalls";
import Game from "./Game/Game";
import Cameras from "./Utility/Cameras";
import MunitionZone from "./Game/UtilityGame/MunitionZone";

const MyCity = () => {
  // const characterRef = useRef<Group | null>(null);

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

          <MainStreet />
          <CityFloorAndWalls />
          <Game />
          {/* <EnemyCharacter position={[0, 1, 0]} /> */}

          <MunitionZone />
        </Physics>
      </Canvas>
    </div>
  );
};

export default MyCity;
// near: 1, far: 20000
