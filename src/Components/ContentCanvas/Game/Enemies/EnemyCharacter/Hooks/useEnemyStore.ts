import { create } from "zustand";

type Enemy = {
  id: string;
  Life: number;
};

type EnemyState = {
  enemies: Enemy[];
  updateEnemyLife: (enemyId: string, damage: number) => void;
};

export const useEnemyStore = create<EnemyState>((set) => ({
  enemies: [
    { id: "enemy1", Life: 100 },
    // { id: "enemy2", Life: 100 },
    // { id: "enemy3", Life: 100 },
  ],
  updateEnemyLife: (enemyId, damage) =>
    set((state) => {
      const updated = state.enemies.map((enemy) =>
        enemy.id === enemyId
          ? { ...enemy, Life: Math.max(0, enemy.Life - damage) }
          : enemy
      );

      return {
        enemies: updated.filter((enemy) => enemy.Life > 0),
      };
    }),
}));
