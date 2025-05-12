// EnemyCharacter.tsx
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useEnemyModel } from "./Hooks/useEnemyModel";
import { useEnemyMovement } from "./Hooks/useEnemyMovement";
import { useEnemyAnimations } from "./Hooks/useEnemyAnimations";

import * as THREE from "three";
import { useEnemyPositionStore } from "./Hooks/useEnemyPosStore";

type EnemyCharacterProps = {
  enemyId: string;
};

const EnemyCharacter = ({ enemyId }: EnemyCharacterProps) => {
  const group = useRef<THREE.Group>(null);
  const enemiesPosition = useEnemyPositionStore((s) => s.enemiesPosition);
  const setEnemiesPosition = useEnemyPositionStore((s) => s.setEnemiesPosition);

  // Carrega o modelo e animações
  const { clonedScene, animations } = useEnemyModel(
    "src/assets/EnemyCharacter.glb",
    enemyId
  );
  const { actions } = useEnemyAnimations(animations, clonedScene);

  // Lógica de movimento
  const updatePosition = useEnemyMovement(actions);

  const enemyPosition = enemiesPosition[enemyId];

  useEffect(() => {
    if (group.current) {
      group.current.position.set(
        enemyPosition?.x || 0, // Posições padrão caso não exista
        enemyPosition?.y || 0,
        enemyPosition?.z || 0
      );
      group.current.add(clonedScene);
    }

    return () => {
      if (group.current) {
        group.current.remove(clonedScene);
      }
    };
  }, [enemyPosition, clonedScene]);

  useFrame((_, delta) => {
    if (group.current) {
      updatePosition(group.current, delta);

      // Atualiza a posição na store
      setEnemiesPosition(enemyId, group.current.position);
    }
  });
  const enemiesArray = Object.values(enemiesPosition).map((pos) => ({
    position: [pos.x, pos.y, pos.z] as [number, number, number],
  }));

  return <group ref={group} />;
};

export default EnemyCharacter;
