import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "./useKeyboardControls";

import { useMovementPhysics } from "./useMovementPhysics";
import { useMouseControls } from "./useMouseControls";

export const useFirstPersonControls = (
  rigidBodyRef: React.RefObject<RapierRigidBody>
) => {
  const { camera } = useThree();
  const { moveState, setupKeyboardListeners } = useKeyboardControls();
  const { setupMouseListeners } = useMouseControls();

  // Inicialização
  useEffect(() => {
    if (rigidBodyRef.current) {
      camera.position.copy(rigidBodyRef.current.translation());
    }

    const cleanUpKeyboard = setupKeyboardListeners();
    const cleanUpMouse = setupMouseListeners();

    return () => {
      cleanUpKeyboard();
      cleanUpMouse();
    };
  }, [rigidBodyRef, camera]);

  // Física e movimento
  useMovementPhysics(rigidBodyRef, moveState, camera);
};
