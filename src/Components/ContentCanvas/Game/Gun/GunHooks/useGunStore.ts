import { create } from "zustand";

type GunStoreState = {
  bullets: number;
  isShooting: boolean;
  shoot: () => void;
  stopShooting: () => void;
  reload: () => void;
  addBullets: (amount: number) => void;
};

export const useGunStore = create<GunStoreState>((set) => ({
  bullets: 50,
  isShooting: false,

  shoot: () =>
    set((state) =>
      state.bullets > 0
        ? { bullets: state.bullets - 1, isShooting: true }
        : state
    ),

  stopShooting: () => set({ isShooting: false }),

  reload: () => set({ bullets: 5 }),

  addBullets: (amount: number) =>
    set((state) => ({ bullets: state.bullets + amount })),
}));
