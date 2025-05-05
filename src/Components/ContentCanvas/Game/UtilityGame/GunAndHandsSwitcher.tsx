import { useEffect } from "react";
import Hands from "./Hands";

import { useItemSwitchStore } from "./useItemSwitchStore";
import Awp from "../Gun/Awp";
import Deagle from "../Gun/Deagle";
import { usePlayerStore } from "../../Camera/FirstPersonCamera/Hooks/usePlayerStore";

const GunAndHandsSwitcher = () => {
  const currentItem = useItemSwitchStore((s) => s.currentItem);
  const setItem = useItemSwitchStore((s) => s.setItem);

  const isAwpZooming = usePlayerStore((s) => s.isAwpZooming);

  useEffect(() => {
    // Early return caso não seja AWP, pois o zoom só é com a AWP

    if (isAwpZooming) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        setItem((prevItem) => {
          if (prevItem === "hands") return "deagle";
          if (prevItem === "deagle") return "awp";
          return "hands";
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setItem, isAwpZooming]);

  return (
    <>
      {currentItem === "hands" && <Hands />}
      {currentItem === "deagle" && <Deagle />}
      {currentItem === "awp" && <Awp />}
    </>
  );
};

export default GunAndHandsSwitcher;
