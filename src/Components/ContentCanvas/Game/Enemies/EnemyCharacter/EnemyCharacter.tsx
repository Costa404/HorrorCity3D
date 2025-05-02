import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useEnemyModel } from "./Hooks/useEnemyModel";

import { useEnemyMovement } from "./Hooks/useEnemyMovement";
import { useEnemyAnimations } from "./Hooks/useEnemyAnimations";
import * as THREE from "three";

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
