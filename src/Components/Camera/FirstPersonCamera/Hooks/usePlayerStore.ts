import { create } from "zustand";
import { RapierRigidBody } from "@react-three/rapier";

type PlayerStore = {
  playerRef: React.RefObject<RapierRigidBody> | null;
  setPlayerRef: (ref: React.RefObject<RapierRigidBody>) => void;

  playerPosition: { x: number; y: number; z: number };
  setPlayerPosition: (pos: { x: number; y: number; z: number }) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),

  playerPosition: { x: 0, y: 0, z: 0 },
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
}));
