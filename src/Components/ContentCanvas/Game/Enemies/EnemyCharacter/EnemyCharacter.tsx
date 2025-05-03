import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useEnemyModel } from "./Hooks/useEnemyModel";

import { useEnemyMovement } from "./Hooks/useEnemyMovement";
import { useEnemyAnimations } from "./Hooks/useEnemyAnimations";
import * as THREE from "three";
import useProximityDamage from "../../Life/useProximityDamage";

type EnemyCharacterProps = {
  position: [number, number, number];
  [key: string]: any;
};

const EnemyCharacter = ({
  position,
  enemyId,
  ...props
}: EnemyCharacterProps) => {
  const group = useRef<THREE.Group>(null);

  const { clonedScene, animations } = useEnemyModel(
    "src/assets/EnemyCharacter.glb",
    enemyId
  );
  // console.log("EnemyCharacter recebeu ID:", enemyId);

  const { actions } = useEnemyAnimations(animations, clonedScene);

  // Lógica de movimento
  const updatePosition = useEnemyMovement(actions);
  const [enemies, setEnemies] = useState<Enemy[]>([]);

  useEffect(() => {
    if (!group.current) return;

    setEnemies([
      {
        position: [
          group.current.position.x,
          group.current.position.y,
          group.current.position.z,
        ],
        takeDamage: () => {
          console.log("Inimigo levou dano!");
        },
      },
    ]);
  }, [group.current]);

  useProximityDamage(enemies, 20, 1);

  useEffect(() => {
    if (group.current) {
      group.current.position.set(...position);
      group.current.add(clonedScene);
    }

    return () => {
      if (group.current) {
        group.current.remove(clonedScene);
      }
    };
  }, [position, clonedScene]);

  useFrame((_, delta) => {
    if (group.current) {
      updatePosition(group.current, delta);
    }
  });

  return <group ref={group} {...props} />;
};

export default EnemyCharacter;
// import { useRef, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useEnemyModel } from "./Hooks/useEnemyModel";
// import { useEnemyMovement } from "./Hooks/useEnemyMovement";
// import { useEnemyAnimations } from "./Hooks/useEnemyAnimations";
// import * as THREE from "three";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// type EnemyCharacterProps = {
//   position: [number, number, number];
//   enemyId: string;
// };

// const EnemyCharacter = ({
//   position,
//   enemyId,
//   ...props
// }: EnemyCharacterProps) => {
//   const group = useRef<THREE.Group>(null);

//   const { clonedScene, animations } = useEnemyModel(
//     "src/assets/EnemyCharacter.glb",
//     enemyId
//   );
//   const { actions } = useEnemyAnimations(animations, clonedScene);
//   const updatePosition = useEnemyMovement(actions);

//   useEffect(() => {
//     if (group.current) {
//       group.current.position.set(...position);
//       group.current.add(clonedScene);
//     }

//     return () => {
//       if (group.current) {
//         group.current.remove(clonedScene);
//       }
//     };
//   }, [position, clonedScene]);

//   useFrame((_, delta) => {
//     if (group.current) {
//       updatePosition(group.current, delta);
//     }
//   });

//   return (
//     <group ref={group} name={`enemy-${enemyId}`} {...props}>
//       {/* Zona de interseção (sensor) */}
//       <RigidBody type="fixed" colliders={false}>
//         <CuboidCollider
//           args={[20, 1, 20]} // largura, altura, profundidade
//           position={[0, 0, 0]} // centraliza no inimigo
//           sensor
//           onIntersectionEnter={({ other }) => {
//             if (other.rigidBodyObject?.name === "player") {
//               console.log(`Jogador entrou na zona do inimigo ${enemyId}`);
//             }
//           }}
//         />
//       </RigidBody>

//       {/* Visualização da zona (apenas visual, sem impacto) */}
//       <gridHelper args={[20, 20, "red", "red"]} position={[0, 0.01, 0]} />
//     </group>
//   );
// };

// export default EnemyCharacter;
