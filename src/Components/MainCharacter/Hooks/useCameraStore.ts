import { create } from "zustand";
import * as THREE from "three";

type CameraState = {
  target: THREE.Object3D | null;
  setTarget: (target: THREE.Object3D) => void;
  cameraOffset: THREE.Vector3;
  setCameraOffset: (offset: THREE.Vector3) => void;
};

export const useCameraStore = create<CameraState>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  cameraOffset: new THREE.Vector3(0, 5, 10),

  setCameraOffset: (offset) => set({ cameraOffset: offset.clone() }),
}));
