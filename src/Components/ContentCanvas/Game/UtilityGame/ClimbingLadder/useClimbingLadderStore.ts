import { create } from "zustand";

type ClimbingLadderState = {
  isClimbingLadder: boolean;
  setClimbingLadder: (value: boolean) => void;
  isInsideTrigger: boolean;
  setIsInsideTrigger: (inside: boolean) => void;
  ladderZoneType: "top" | "bottom" | null;
  setLadderZoneType: (zone: "top" | "bottom" | null) => void;
};

export const useClimbingLadderStore = create<ClimbingLadderState>((set) => ({
  isClimbingLadder: false,
  setClimbingLadder: (value) => set({ isClimbingLadder: value }),
  isInsideTrigger: false,
  setIsInsideTrigger: (inside) => set({ isInsideTrigger: inside }),
  ladderZoneType: null,
  setLadderZoneType: (zone) => set({ ladderZoneType: zone }),
}));
