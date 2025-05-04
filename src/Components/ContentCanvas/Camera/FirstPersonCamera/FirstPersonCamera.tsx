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

const FirstPersonCamera = () => {
  const playerRef = useRef<RapierRigidBody | null>(null);

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
        position={[110, 1.4, 110]}
        type="dynamic"
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
    </>
  );
};

export default FirstPersonCamera;
