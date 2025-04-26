import { create } from "zustand";

type GunStoreState = {
  bullets: number;
  shoot: () => void;
  reload: () => void;
  addBullets: (amount: number) => void; // Função para adicionar balas
};

export const useGunStore = create<GunStoreState>((set) => ({
  bullets: 20,
  shoot: () =>
    set((state) =>
      state.bullets > 0 ? { bullets: state.bullets - 1 } : state
    ),
  reload: () => set({ bullets: 5 }),
  addBullets: (amount: number) =>
    set((state) => ({ bullets: state.bullets + amount })),
}));
