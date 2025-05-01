import { useGunStore } from "./useGunStore";

const useShoot = () => {
  const bullets = useGunStore((state) => state.bullets);

  const shoot = () => {
    useGunStore.getState().shoot();

    const shotSound = new Audio("src/assets/Sounds/gunShot.ogg");
    shotSound.currentTime = 0;
    shotSound.play();
  };

  return { bullets, shoot };
};

export default useShoot;
