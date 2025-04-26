import { create } from "zustand";

export type ItemType = "hands" | "gun";

type Store = {
  currentItem: ItemType;
  setItem: (item: ItemType) => void;
};

export const useItemSwitchStore = create<Store>((set) => ({
  currentItem: "hands",
  setItem: (item) => set({ currentItem: item }),
}));
