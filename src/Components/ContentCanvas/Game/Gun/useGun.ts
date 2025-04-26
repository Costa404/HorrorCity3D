import { useGunStore } from "./useGunStore";

const useGun = () => {
  const bullets = useGunStore((state) => state.bullets);

  const shoot = () => {
    if (bullets <= 0) {
      return;
    }

    useGunStore.getState().shoot();

    const shotSound = new Audio("src/assets/Sounds/gunShot.ogg");
    shotSound.currentTime = 0;
    shotSound.play();
  };

  return { bullets, shoot };
};

export default useGun;
