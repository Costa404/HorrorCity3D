import { create } from "zustand";
import { Vector3 } from "three";

type EnemyPositions = {
  [id: string]: Vector3;
};

type EnemyPositionStore = {
  enemiesPosition: EnemyPositions;
  setEnemiesPosition: (id: string, position: Vector3) => void;
};

export const useEnemyPositionStore = create<EnemyPositionStore>((set) => ({
  enemiesPosition: {},

  setEnemiesPosition: (id, position) =>
    set((state) => ({
      enemiesPosition: {
        ...state.enemiesPosition,
        [id]: position.clone(), // ← cria uma nova instância para evitar referência compartilhada
      },
    })),
}));

// Criei esta store para guardar a posição dos inimigos e assim poder a partilhar com outros componentes sem precisar passar props
