import { useEffect } from "react";
import * as THREE from "three";
import { usePlayerStore } from "../../Camera/FirstPersonCamera/Hooks/usePlayerStore";
import { removeLife } from "./lifeController";

type Enemy = {
  position: [number, number, number];
};

const useProximityDamage = (
  enemies: Enemy[],
  damageRadius: number = 20,
  damageAmount: number = 1
) => {
  const playerRef = usePlayerStore((state) => state.playerRef);

  useEffect(() => {
    const damageNearbyEnemies = () => {
      const playerBody = playerRef?.current;

      if (playerBody) {
        const translation = playerBody.translation(); // translation retorna { x, y, z }

        if (translation) {
          const playerPos = new THREE.Vector3(
            translation.x,
            translation.y,
            translation.z
          );
          // usei foreach porque não quero o return, quero apenas manipular a array enemies.
          enemies.forEach((enemy) => {
            const enemyPos = new THREE.Vector3(...enemy.position);
            const distance = playerPos.distanceTo(enemyPos);

            if (distance < damageRadius) {
              // console.log("Distância entre jogador e inimigo:", distance);
              removeLife(damageAmount);
            }
          });
        }
      } else {
        console.warn("playerRef.current não está definido ainda.");
      }
    };

    // Definir o intervalo de check, neste caso a cada segundo
    const interval = setInterval(damageNearbyEnemies, 1000);

    return () => clearInterval(interval); // Limpar o intervalo quando o componente é desmontado para evitar bugs
  }, [playerRef, enemies, damageRadius, damageAmount]);

  return null; // Esse hook não dá return de nada porque o objetivo principal dele é realizar efeitos colaterais, ou seja, manipular o comportamento da app sem alterar o estado diretamente ou produzir um valor que precisa ser utilizado em outro lugar.
};

export default useProximityDamage;
