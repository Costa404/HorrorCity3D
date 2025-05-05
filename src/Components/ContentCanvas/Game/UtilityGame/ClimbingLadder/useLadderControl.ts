import { useEffect, useState } from "react";
import { useClimbingLadderStore } from "./useClimbingLadderStore";

export const useLadderControl = () => {
  const isInsideTrigger = useClimbingLadderStore((s) => s.isInsideTrigger);
  const type = useClimbingLadderStore((s) => s.ladderZoneType);
  const isClimbing = useClimbingLadderStore((s) => s.isClimbingLadder);
  const setClimbingLadder = useClimbingLadderStore((s) => s.setClimbingLadder);

  const [buttonText, setButtonText] = useState<string>("");

  useEffect(() => {
    if (isInsideTrigger) {
      if (isClimbing) {
        setButtonText("E to exit");
      } else {
        if (type === "bottom" || type === "top") {
          setButtonText("E to climb");
        }
      }
    } else {
      setButtonText(""); // Não mostra nada se não estiver na triggerZone
    }
  }, [isInsideTrigger, type, isClimbing]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "e" && isInsideTrigger) {
      if (!isClimbing) {
        setClimbingLadder(true);
      } else {
        setClimbingLadder(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInsideTrigger, isClimbing, setClimbingLadder]);

  return { buttonText, setClimbingLadder };
};
