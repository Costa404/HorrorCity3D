import { useRef } from "react";

type MoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

export const useKeyboardControls = () => {
  const moveState = useRef<MoveState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  const setupKeyboardListeners = () => {
    const handleKey = (e: KeyboardEvent, isKeyDown: boolean) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          moveState.current.forward = isKeyDown;
          break;
        case "s":
        case "arrowdown":
          moveState.current.backward = isKeyDown;
          break;
        case "a":
        case "arrowleft":
          moveState.current.left = isKeyDown;
          break;
        case "d":
        case "arrowright":
          moveState.current.right = isKeyDown;
          break;
        case " ":
          moveState.current.jump = isKeyDown;
          break;
      }
    };

    window.addEventListener("keydown", (e) => handleKey(e, true));
    window.addEventListener("keyup", (e) => handleKey(e, false));

    return () => {
      window.removeEventListener("keydown", (e) => handleKey(e, true));
      window.removeEventListener("keyup", (e) => handleKey(e, false));
    };
  };

  return { moveState, setupKeyboardListeners };
};
