import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useFirstPersonControls } from "./Hooks/useFirstPersonControls";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "./Hooks/usePlayerStore";
import { SyncCameraWithPlayer } from "./Hooks/SyncCameraWithPlayer";
import GunAndHandsSwitcher from "../../Game/UtilityGame/GunAndHandsSwitcher";
import Flashlight from "../../Game/UtilityGame/Flashlight/Flashlight";

const FirstPersonCamera = () => {
  const playerRef = useRef<RapierRigidBody | null>(null);

  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);

  useFirstPersonControls(playerRef);

  useEffect(() => {
    if (playerRef.current) {
      // Set the reference in the store when it is first available
      setPlayerRef(playerRef);
    }
  }, [setPlayerRef]);

  return (
    <>
      <SyncCameraWithPlayer target={playerRef} />
      <RigidBody
        ref={playerRef}
        position={[110, 1.4, 110]}
        type="dynamic"
        name="player"
        lockRotations
        mass={1}
      >
        <GunAndHandsSwitcher />
        <CuboidCollider args={[1.75, 1, 1.75]} />{" "}
        <mesh>
          <boxGeometry args={[1, 1, 1.75]} />
          <meshBasicMaterial color="red" wireframe />
        </mesh>
      </RigidBody>
      <Flashlight />
    </>
  );
};

export default FirstPersonCamera;
