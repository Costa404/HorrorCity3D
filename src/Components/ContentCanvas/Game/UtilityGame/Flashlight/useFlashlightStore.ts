import { create } from "zustand";

type FlashlightState = {
  isFlashlightOn: boolean;
  toggleFlashlight: () => void;
  set: (value: boolean) => void;
};

export const useFlashlightStore = create<FlashlightState>((set) => ({
  isFlashlightOn: false,
  toggleFlashlight: () =>
    set((state) => ({ isFlashlightOn: !state.isFlashlightOn })),
  set: (value: boolean) => set({ isFlashlightOn: value }),
}));
