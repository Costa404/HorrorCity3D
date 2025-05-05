// import * as THREE from "three";
// import { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { RapierRigidBody } from "@react-three/rapier";

// import { usePlayerStore } from "./usePlayerStore";
// import { useClimbingLadderStore } from "../../../Game/UtilityGame/ClimbingLadder/useClimbingLadderStore";

// const MOVEMENT_SPEED = 25;
// const CLIMB_SPEED = 5;
// const JUMP_FORCE = 15;
// const LADDER_TOP_Y = 30;
// const ROOFTOP_Y = 30.8;

// type MoveState = {
//   forward: boolean;
//   backward: boolean;
//   left: boolean;
//   right: boolean;
//   jump: boolean;
// };

// export const useMovement = (
//   rigidBodyRef: React.RefObject<RapierRigidBody>,
//   moveState: React.RefObject<MoveState>,
//   cameraDirection: THREE.Vector3
// ) => {
//   const velocity = useRef(new THREE.Vector3());
//   const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition);
//   const [isMoving, setIsMoving] = useState(false);

//   // Estados do modo escada
//   const { isClimbingLadder, setClimbingLadder } = useClimbingLadderStore();

//   useFrame(() => {
//     if (!rigidBodyRef.current || !moveState.current) return;

//     const rigidBody = rigidBodyRef.current;
//     const currentMoveState = moveState.current;
//     const position = rigidBody.translation();

//     if (isClimbingLadder) {
//       // Verifica se o jogador está subindo ou descendo
//       let climbDirection = 0;
//       if (currentMoveState.forward) climbDirection = 1;
//       if (currentMoveState.backward) climbDirection = -1;

//       console.log(
//         "🧗 Subindo escada:",
//         climbDirection !== 0 ? "Sim" : "Parado"
//       );

//       rigidBody.setGravityScale(0, true);
//       rigidBody.setLinvel(
//         { x: 0, y: climbDirection * CLIMB_SPEED, z: 0 },
//         true
//       );

//       // Quando atinge o topo da escada
//       if (position.y >= LADDER_TOP_Y) {
//         console.log("✅ Chegou ao topo da escada!");
//         setClimbingLadder(false);
//         rigidBody.setGravityScale(1, true);
//         rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
//         rigidBody.setTranslation(
//           { x: position.x, y: ROOFTOP_Y, z: position.z },
//           true
//         );
//       }

//       setPlayerPosition(position);
//       setIsMoving(climbDirection !== 0);
//       return; // interrompe o movimento normal se estiver subindo a escada
//     }

//     // Movimento normal (X/Z) quando não está subindo escadaa
//     const direction = new THREE.Vector3();
//     const forward = new THREE.Vector3();
//     const right = new THREE.Vector3();

//     forward.copy(cameraDirection).setY(0).normalize();
//     right.crossVectors(new THREE.Vector3(0, 1, 0), forward);

//     if (currentMoveState.forward) direction.add(forward);
//     if (currentMoveState.backward) direction.sub(forward);
//     if (currentMoveState.left) direction.sub(right);
//     if (currentMoveState.right) direction.add(right);

//     if (direction.length() > 0) direction.normalize();
//     velocity.current.copy(direction).multiplyScalar(MOVEMENT_SPEED);

//     rigidBody.setLinvel(
//       {
//         x: velocity.current.x,
//         y: rigidBody.linvel().y, // Mantém a velocidade no eixo Y
//         z: velocity.current.z,
//       },
//       true
//     );

//     // Verifica se o jogador está tentando pular
//     if (currentMoveState.jump) {
//       console.log("⛹️ Pulando!");
//       rigidBody.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
//     }

//     setPlayerPosition(position);
//     setIsMoving(direction.length() > 0);
//   });
// };
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { usePlayerStore } from "./usePlayerStore";
import { useClimbingLadderStore } from "../../../Game/UtilityGame/ClimbingLadder/useClimbingLadderStore";
import * as THREE from "three";
import { handleClimbingLadder } from "../../../Game/UtilityGame/ClimbingLadder/useClimbingLadder";
import { handleNormalMovement } from "./handleNormalMovement";

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
  const setPlayerPosition = usePlayerStore((s) => s.setPlayerPosition);
  const isClimbingLadder = useClimbingLadderStore((s) => s.isClimbingLadder);
  const setClimbingLadder = useClimbingLadderStore((s) => s.setClimbingLadder);

  useFrame(() => {
    if (!rigidBodyRef.current || !moveState.current) return;

    const rigidBody = rigidBodyRef.current;
    const currentMoveState = moveState.current;
    const position = rigidBody.translation();

    if (isClimbingLadder) {
      handleClimbingLadder(
        rigidBody,
        currentMoveState,
        position,
        setClimbingLadder,
        setPlayerPosition
      );

      return;
    }

    handleNormalMovement(
      rigidBody,
      currentMoveState,
      cameraDirection,
      velocity,
      setPlayerPosition
    );
  });
};
