import { useItemSwitchStore } from "../../UtilityGame/useItemSwitchStore";
import { useGunStore } from "./useGunStore";
import { useState, useRef } from "react";

const useShoot = () => {
  const { currentItem } = useItemSwitchStore();
  const bullets = useGunStore((state) => state.bullets);
  const [canShoot, setCanShoot] = useState(true);
  const awpSoundRef = useRef(new Audio("src/assets/Sounds/awp.ogg"));
  const deagleSoundRef = useRef(new Audio("src/assets/Sounds/deagle.ogg"));

  const shoot = () => {
    if (!canShoot) return;

    useGunStore.getState().shoot();
    let shotSound: HTMLAudioElement | null = null;

    if (currentItem === "deagle") {
      shotSound = deagleSoundRef.current;
      shotSound.currentTime = 0;
      shotSound.play();
    }

    if (currentItem === "awp") {
      shotSound = awpSoundRef.current;
      shotSound.currentTime = 0;
      shotSound.play();

      // bloqueia novos disparos até terminar o som
      setCanShoot(false);
      setTimeout(() => {
        setCanShoot(true);
      }, 1500); // 1.5s entre tiros AWP
    }
  };

  return { bullets, shoot };
};

export default useShoot;
