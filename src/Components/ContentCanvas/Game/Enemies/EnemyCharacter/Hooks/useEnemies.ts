import { useState } from "react";

type Enemy = {
  id: string;
  position: [number, number, number];
  Life: number;
};

const useEnemies = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: "enemy1", position: [5, 1, -10], Life: 100 },
    { id: "enemy2", position: [3, 1, -8], Life: 100 },
  ]);

  const updateEnemyLife = (enemyId: string, damage: number) => {
    setEnemies((prev) => {
      const updated = prev.map((enemy) =>
        enemy.id === enemyId
          ? { ...enemy, Life: Math.max(0, enemy.Life - damage) }
          : enemy
      );

      // Remove enemies com life 0
      return updated.filter((enemy) => enemy.Life > 0);
    });
  };

  return {
    enemies,
    updateEnemyLife,
  };
};

export default useEnemies;
