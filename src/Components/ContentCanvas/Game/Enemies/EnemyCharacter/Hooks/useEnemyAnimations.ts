import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";
import { useRef } from "react";

export const useEnemyAnimations = (animations: any, clonedScene: any) => {
  const clonedRef = useRef(clonedScene);
  const { actions } = useAnimations(animations, clonedRef);

  useEffect(() => {
    if (actions?.ArmatureAction) {
      actions.ArmatureAction.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return { actions };
};
