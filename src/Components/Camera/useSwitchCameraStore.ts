import { create } from "zustand";
import { Vector3 } from "three";

interface SwitchCameraState {
  activeCamera: string;
  activeTrashId: string | null;
  trashPositions: Record<string, Vector3>;
  setActiveCamera: (camera: string, trashId?: string) => void;
  setTrashPosition: (id: string, position: Vector3) => void;
}

export const useSwitchCameraStore = create<SwitchCameraState>((set) => ({
  activeCamera: "firstPerson",
  activeTrashId: null,
  trashPositions: {},
  setActiveCamera: (camera, trashId) =>
    set({ activeCamera: camera, activeTrashId: trashId }),
  setTrashPosition: (id, position) =>
    set((state) => ({
      trashPositions: {
        ...state.trashPositions,
        [id]: position,
      },
    })),
}));
