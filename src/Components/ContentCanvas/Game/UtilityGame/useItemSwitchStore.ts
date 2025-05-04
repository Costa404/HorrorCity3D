import { create } from "zustand";

type Item = "hands" | "deagle" | "awp";

interface ItemSwitchState {
  currentItem: Item;
  setItem: (item: Item | ((prev: Item) => Item)) => void;
}

export const useItemSwitchStore = create<ItemSwitchState>((set) => ({
  currentItem: "hands",
  setItem: (item) => {
    if (typeof item === "function") {
      set((state) => ({ currentItem: item(state.currentItem) }));
    } else {
      set({ currentItem: item });
    }
  },
}));
