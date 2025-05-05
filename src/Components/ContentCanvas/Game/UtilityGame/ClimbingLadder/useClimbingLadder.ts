import { RapierRigidBody } from "@react-three/rapier";

const CLIMB_SPEED = 5;
const LADDER_TOP_Y = 30;
const ROOFTOP_Y = 30.8;

export const handleClimbingLadder = (
  rigidBody: RapierRigidBody,
  moveState: { forward: boolean; backward: boolean },
  position: { x: number; y: number; z: number },
  setClimbingLadder: (value: boolean) => void,
  setPlayerPosition: (position: { x: number; y: number; z: number }) => void
) => {
  let climbDirection = 0;
  if (moveState.forward) climbDirection = 1;
  if (moveState.backward) climbDirection = -1;

  rigidBody.setGravityScale(0, true);
  rigidBody.setLinvel({ x: 0, y: climbDirection * CLIMB_SPEED, z: 0 }, true);

  if (position.y >= LADDER_TOP_Y) {
    setClimbingLadder(false);
    rigidBody.setGravityScale(1, true);
    rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBody.setTranslation(
      { x: position.x, y: ROOFTOP_Y, z: position.z },
      true
    );
  }

  setPlayerPosition(position);
};
