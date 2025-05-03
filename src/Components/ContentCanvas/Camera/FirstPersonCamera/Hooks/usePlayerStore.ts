import { create } from "zustand";
import { RapierRigidBody } from "@react-three/rapier";

import * as THREE from "three";

interface PlayerState {
  playerRef: React.RefObject<RapierRigidBody> | null;
  playerPosition: THREE.Vector3 | null;
  cameraDirection: THREE.Vector3;
  setPlayerRef: (ref: React.RefObject<RapierRigidBody> | null) => void;
  setPlayerPosition: (position: THREE.Vector3 | null) => void;
  setCameraDirection: (direction: THREE.Vector3) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playerRef: null,
  playerPosition: null,
  cameraDirection: new THREE.Vector3(),
  setPlayerRef: (ref) => set({ playerRef: ref }),
  setPlayerPosition: (position) => set({ playerPosition: position }),
  setCameraDirection: (direction) => set({ cameraDirection: direction }),
}));
