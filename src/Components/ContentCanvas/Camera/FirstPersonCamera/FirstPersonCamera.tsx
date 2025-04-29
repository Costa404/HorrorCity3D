import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFirstPersonControls } from "./Hooks/useFirstPersonControls";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "./Hooks/usePlayerStore";
import { SyncCameraWithPlayer } from "./Hooks/SyncCameraWithPlayer";

import GunAndHandsSwitcher from "../../Game/UtilityGame/GunAndHandsSwitcher";

const FirstPersonCamera = () => {
  const playerRef = useRef<RapierRigidBody>(null);
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);

  useFirstPersonControls(playerRef);

  useEffect(() => {
    if (playerRef.current) {
      setPlayerRef(playerRef);
    }
  }, [playerRef.current]);

  return (
    <>
      <SyncCameraWithPlayer target={playerRef} />
      <RigidBody
        ref={playerRef}
        position={[50, 1.4, 0]}
        colliders="cuboid"
        type="dynamic"
        lockRotations
        mass={1}
      >
        <GunAndHandsSwitcher />
        <mesh visible={false}>
          <boxGeometry args={[1.5, 2, 0.5]} />{" "}
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default FirstPersonCamera;
