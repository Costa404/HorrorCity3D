import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

import { usePlayerStore } from "./usePlayerStore";

const MOVEMENT_SPEED = 25;
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
  const isOnGround = useRef(false);
  const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition);
  const isAwpZooming = usePlayerStore((state) => state.isAwpZooming);

  const [isMoving, setIsMoving] = useState(false);
  // useFootstepSound(isMoving);

  useFrame((_, delta) => {
    if (!rigidBodyRef.current || !moveState.current) return;

    const rigidBody = rigidBodyRef.current;
    const currentMoveState = moveState.current;

    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    // Verifica se está no chão
    const position = rigidBody.translation();
    isOnGround.current = position.y < GROUND_THRESHOLD;

    // Direção da câmera
    forward.copy(cameraDirection).setY(0).normalize();
    right.crossVectors(new THREE.Vector3(0, 1, 0), forward);

    // Calcula a direção com base nas teclas
    if (currentMoveState.forward) direction.add(forward);
    if (currentMoveState.backward) direction.sub(forward);
    if (currentMoveState.left) direction.sub(right);
    if (currentMoveState.right) direction.add(right);

    // Normaliza e aplica velocidade
    if (direction.length() > 0) direction.normalize();
    velocity.current.copy(direction).multiplyScalar(MOVEMENT_SPEED);

    // Aplica movimento com física
    rigidBody.setLinvel(
      {
        x: velocity.current.x,
        y: rigidBody.linvel().y,
        z: velocity.current.z,
      },
      true
    );

    // Aplica salto
    if (currentMoveState.jump && isOnGround.current) {
      rigidBody.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
    }

    // Atualiza posição no store
    setPlayerPosition(rigidBody.translation());

    // Atualiza estado de andar
    setIsMoving(direction.length() > 0 && isOnGround.current);
  });
};
