// stores/playerStore.ts
import { create } from "zustand";
import { RapierRigidBody } from "@react-three/rapier";

type PlayerStore = {
  playerRef: React.RefObject<RapierRigidBody> | null;
  setPlayerRef: (ref: React.RefObject<RapierRigidBody>) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),
}));
