import { useState } from "react";

type Enemy = {
  id: string;
  Life: number;
};

const useEnemies = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: "enemy1", Life: 100 },
    { id: "enemy2", Life: 100 },
    { id: "enemy3", Life: 100 },
  ]);

  const updateEnemyLife = (enemyId: string, damage: number) => {
    setEnemies((prev) => {
      const updated = prev.map((enemy) =>
        enemy.id === enemyId
          ? { ...enemy, Life: Math.max(0, enemy.Life - damage) }
          : enemy
      );

      return updated.filter((enemy) => enemy.Life > 0);
    });
  };

  return {
    enemies,
    updateEnemyLife,
  };
};

export default useEnemies;
