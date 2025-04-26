import { useState } from "react";

type Enemy = {
  id: string;
  position: [number, number, number];
  health: number;
};

const useEnemies = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: "enemy1", position: [5, 1, -10], health: 100 },
    { id: "enemy2", position: [3, 1, -8], health: 100 },
  ]);

  const updateEnemyHealth = (enemyId: string, damage: number) => {
    setEnemies((prev) => {
      const updated = prev.map((enemy) =>
        enemy.id === enemyId
          ? { ...enemy, health: Math.max(0, enemy.health - damage) }
          : enemy
      );

      // Remove inimigos com saúde 0
      return updated.filter((enemy) => enemy.health > 0);
    });
  };

  return {
    enemies,
    updateEnemyHealth,
  };
};

export default useEnemies;
