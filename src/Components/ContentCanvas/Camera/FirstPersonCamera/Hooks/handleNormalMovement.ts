import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";
import { MoveState } from "../../../UiCanvas/types";

const MOVEMENT_SPEED = 25;
const JUMP_FORCE = 15;

export const handleNormalMovement = (
  rigidBody: RapierRigidBody,
  moveState: MoveState,
  cameraDirection: THREE.Vector3,
  velocity: React.RefObject<THREE.Vector3>,
  setPlayerPosition: (position: { x: number; y: number; z: number }) => void
) => {
  const direction = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();

  forward.copy(cameraDirection).setY(0).normalize();
  right.crossVectors(forward, new THREE.Vector3(0, 1, 0));

  if (moveState.forward) direction.add(forward);
  if (moveState.backward) direction.sub(forward);
  if (moveState.left) direction.sub(right);
  if (moveState.right) direction.add(right);

  if (direction.length() > 0) direction.normalize();
  velocity.current.copy(direction).multiplyScalar(MOVEMENT_SPEED);

  rigidBody.setLinvel(
    {
      x: velocity.current.x,
      y: rigidBody.linvel().y,
      z: velocity.current.z,
    },
    true
  );

  if (moveState.jump) {
    rigidBody.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
  }

  setPlayerPosition(rigidBody.translation());
};
