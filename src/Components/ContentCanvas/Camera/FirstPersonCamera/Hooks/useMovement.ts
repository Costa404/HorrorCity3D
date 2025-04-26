import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

import { usePlayerStore } from "./usePlayerStore";
import { useFootstepSound } from "./useFoostepSound";

const MOVEMENT_SPEED = 55;
const JUMP_FORCE = 5;
const GROUND_THRESHOLD = 0.1;

type MoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

export const useMovement = (
  rigidBodyRef: React.RefObject<RapierRigidBody>,
  moveState: React.RefObject<MoveState>,
  cameraDirection: THREE.Vector3
) => {
  const velocity = useRef(new THREE.Vector3());
  const isMoving = useRef(false);
  const isOnGround = useRef(false);
  const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition);

  useFootstepSound(isMoving.current);

  useFrame((_, delta) => {
    if (!rigidBodyRef.current || !moveState.current) return;

    const rigidBody = rigidBodyRef.current;
    const currentMoveState = moveState.current;

    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    const currentPosition = rigidBody.translation();
    isOnGround.current = currentPosition.y < GROUND_THRESHOLD;

    // Usa a direção da câmera passada como parâmetro
    forward.copy(cameraDirection).setY(0).normalize();
    right.crossVectors(new THREE.Vector3(0, 1, 0), forward);

    if (currentMoveState.forward) direction.add(forward);
    if (currentMoveState.backward) direction.sub(forward);
    if (currentMoveState.left) direction.sub(right);
    if (currentMoveState.right) direction.add(right);

    if (direction.length() > 0) direction.normalize();
    velocity.current = direction.multiplyScalar(MOVEMENT_SPEED);

    const newPosition = rigidBody.translation();
    newPosition.x += velocity.current.x * delta;
    newPosition.z += velocity.current.z * delta;
    rigidBody.setTranslation(newPosition, true);

    setPlayerPosition(newPosition);
    isMoving.current = direction.length() > 0 && isOnGround.current;
  });
};
