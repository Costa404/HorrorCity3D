import { create } from "zustand";

interface GameState {
  hasGameStarted: boolean;
  setHasGameStarted: (started: boolean) => void;
  showGameScene: boolean;
  setShowGameScene: (visible: boolean) => void;
}

export const useStartGameStore = create<GameState>((set) => ({
  hasGameStarted: false,
  setHasGameStarted: (started) => set({ hasGameStarted: started }),
  showGameScene: false,
  setShowGameScene: (visible) => set({ showGameScene: visible }),
}));
