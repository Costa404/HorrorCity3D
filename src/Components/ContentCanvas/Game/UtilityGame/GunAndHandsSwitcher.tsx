import { useEffect } from "react";

import Hands from "./Hands";
import Gun from "../Gun/Gun";
import { useItemSwitchStore } from "./HooksGame/useItemSwitchStore";

const GunAndHandsSwitcher = () => {
  const { currentItem, setItem } = useItemSwitchStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();

        setItem(currentItem === "gun" ? "hands" : "gun");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentItem, setItem]);

  return currentItem === "gun" ? <Gun /> : <Hands />;
};

export default GunAndHandsSwitcher;
