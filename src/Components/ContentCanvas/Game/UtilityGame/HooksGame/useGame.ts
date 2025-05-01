import { useRef } from "react";
import * as THREE from "three";
import useEnemies from "./useEnemies";

import { useItemSwitchStore } from "./useItemSwitchStore";
import useShoot from "../../Gun/useGun";

const useGame = (camera: THREE.Camera, scene: THREE.Scene) => {
  const raycaster = useRef(new THREE.Raycaster());
  const { enemies, updateEnemyHealth } = useEnemies();
  const { bullets, shoot } = useShoot();
  const { currentItem } = useItemSwitchStore();

  const handleShoot = () => {
    if (currentItem === "hands") return;
    if (bullets <= 0) {
      const noBullets = new Audio("src/assets/Sounds/noBullets.mp3");
      noBullets
        .play()
        .catch((err) => console.error("Erro ao tocar o som:", err));
      return;
    }

    shoot();

    raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    for (let hit of intersects) {
      const obj = hit.object;

      if (obj.userData.enemyId) {
        const enemyId = obj.userData.enemyId;
        updateEnemyHealth(enemyId, 30);
        break;
      }
    }
  };

  return { enemies, handleShoot, bullets };
};

export default useGame;
