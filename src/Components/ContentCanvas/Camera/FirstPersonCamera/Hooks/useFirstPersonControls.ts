import { useEffect } from "react";

import { RapierRigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "./useKeyboardControls";

import { useMouseControls } from "./useMouseControls";
import { usePlayerStore } from "./usePlayerStore";
import { useMovement } from "./useMovement";

export const useFirstPersonControls = (
  rigidBodyRef: React.RefObject<RapierRigidBody | null>
) => {
  const { moveState, setupKeyboardListeners } = useKeyboardControls();
  const { setupMouseListeners } = useMouseControls();
  const cameraDirection = usePlayerStore((state) => state.cameraDirection);

  useEffect(() => {
    const cleanUpKeyboard = setupKeyboardListeners();
    const cleanUpMouse = setupMouseListeners();

    return () => {
      cleanUpKeyboard();
      cleanUpMouse();
    };
  }, []);

  useMovement(rigidBodyRef, moveState, cameraDirection);
};
