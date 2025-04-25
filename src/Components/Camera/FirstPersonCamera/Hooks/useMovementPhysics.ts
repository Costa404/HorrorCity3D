// Importa o store
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { useFootstepSound } from "./useFoostepSound";
import { usePlayerStore } from "./usePlayerStore";
import { useSwitchCameraStore } from "../../useSwitchCameraStore";

const MOVEMENT_SPEED = 15;
const JUMP_FORCE = 5;
const GROUND_THRESHOLD = 0.1;

type MoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

export const useMovementPhysics = (
  rigidBodyRef: React.RefObject<RapierRigidBody>,
  moveState: React.RefObject<MoveState>,
  camera: THREE.Camera
) => {
  const velocity = useRef(new THREE.Vector3());
  const isMoving = useRef(false);
  const isOnGround = useRef(false);
  const { activeCamera } = useSwitchCameraStore();

  const setPlayerPosition = usePlayerStore((state) => state.setPlayerRef); // Função para setar a posição no store

  useFootstepSound(isMoving.current);

  useFrame((_, delta) => {
    // console.log("DEBUG - activeCamera:", activeCamera);

    if (activeCamera !== "firstPerson") {
      console.log("Saindo do useFrame - camera não é firstPerson");
      return;
    }

    if (!rigidBodyRef.current || !moveState.current) return;

    const rigidbody = rigidBodyRef.current;
    const currentMoveState = moveState.current;
    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    // Check ground contact
    const currentPosition = rigidbody.translation();
    isOnGround.current = currentPosition.y < GROUND_THRESHOLD;

    // Movement direction
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(new THREE.Vector3(0, 1, 0), forward);

    // Apply movement inputs
    if (currentMoveState.forward) direction.add(forward);
    if (currentMoveState.backward) direction.sub(forward);
    if (currentMoveState.left) direction.sub(right);
    if (currentMoveState.right) direction.add(right);

    // if (currentMoveState.jump && isOnGround.current) {
    //   rigidbody.setLinvel({ x: 0, y: JUMP_FORCE, z: 0 }, true);
    //   isOnGround.current = false;
    // }

    if (direction.length() > 0) direction.normalize();
    velocity.current = direction.multiplyScalar(MOVEMENT_SPEED);

    // Update position (only x/z for movement)
    const newPosition = rigidbody.translation();
    newPosition.x += velocity.current.x * delta;
    newPosition.z += velocity.current.z * delta;
    rigidbody.setTranslation(newPosition, true);

    // Atualize a posição no store
    setPlayerPosition(newPosition);

    // Sync camera position
    camera.position.copy(newPosition);

    // Update movement state
    isMoving.current = direction.length() > 0 && isOnGround.current;
  });
};
