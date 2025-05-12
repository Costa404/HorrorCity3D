import { useEffect, useState } from "react";
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
  const [isDamaging, setIsDamaging] = useState(false); // Estado para evitar dano repetido

  useEffect(() => {
    const damageNearbyEnemies = () => {
      const playerBody = playerRef?.current;
      if (!playerBody) {
        console.warn("⚠️ playerRef.current está undefined");
        return;
      }

      const translation = playerBody.translation?.();
      if (!translation) {
        console.warn(
          "⚠️ playerRef.current.translation() falhou ou é undefined"
        );
        return;
      }

      const playerPos = new THREE.Vector3(
        translation.x,
        translation.y,
        translation.z
      );

      enemies.forEach((enemy, i) => {
        const enemyPos = new THREE.Vector3(...enemy.position);
        const distance = playerPos.distanceTo(enemyPos);

        if (distance < damageRadius && !isDamaging) {
          // Verificar se não está aplicando dano
          setIsDamaging(true); // Marcar como dano aplicado
          removeLife(damageAmount);
        }
      });
    };

    const interval = setInterval(() => {
      damageNearbyEnemies();
      setIsDamaging(false); // Resetar após o intervalo
    }, 1000);

    return () => clearInterval(interval);
  }, [playerRef, enemies, damageRadius, damageAmount, isDamaging]);

  return null;
};

export default useProximityDamage;
