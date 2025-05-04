import { useRef } from "react";
import * as THREE from "three";

import useEnemies from "../../Enemies/EnemyCharacter/Hooks/useEnemies";
import useShoot from "./useGun";
import { useItemSwitchStore } from "../../UtilityGame/useItemSwitchStore";

const useShotCollision = (camera: THREE.Camera, scene: THREE.Scene) => {
  const raycaster = useRef(new THREE.Raycaster());
  const { enemies, updateEnemyLife } = useEnemies();
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

    // Definir o Raycaster com base na posição da câmera e direção
    raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);

    const intersects = raycaster.current.intersectObjects(scene.children, true);

    // Lógica para processar a colisão
    for (let hit of intersects) {
      const obj = hit.object;
      // console.log("Objeto atingido:", obj);

      if (obj.userData.enemyId) {
        const enemyId = obj.userData.enemyId;

        // console.log("Inimigo atingido com ID:", enemyId);
        updateEnemyLife(enemyId, 30);
        break;
      }
    }
  };

  return { enemies, handleShoot, bullets };
};

export default useShotCollision;
