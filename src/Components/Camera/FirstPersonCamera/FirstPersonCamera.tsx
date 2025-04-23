import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFirstPersonControls } from "./Hooks/useFirstPersonControls";

import { useEffect, useRef } from "react";
import { useSpotLightFollow } from "./Hooks/useSpotLightFollow";
import { usePlayerStore } from "./Hooks/useCameraStore";

const FirstPersonCamera = () => {
  const refPlayer = useRef<RapierRigidBody>();
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);
  // const spotLightRef = useSpotLightFollow();

  useFirstPersonControls(refPlayer);
  useEffect(() => {
    if (refPlayer.current) {
      setPlayerRef(refPlayer);
    }
  }, [refPlayer.current]);

  // console.log("refPlayer", refPlayer);

  return (
    <RigidBody
      ref={refPlayer}
      position={[50, 1.6, 0]}
      colliders="cuboid"
      type="dynamic"
      lockRotations
      mass={1}
    >
      {/* <spotLight
        ref={spotLightRef}
        intensity={100}
        angle={Math.PI / 6}
        penumbra={0.5}
        distance={20}
        decay={2}
        color="white"
        castShadow
      /> */}
    </RigidBody>
  );
};

export default FirstPersonCamera;
