import { useEffect, useState } from "react";
import { Mesh } from "three";
import EnemyCharacter from "./EnemyCharacter/EnemyCharacter";

type EnemyCubeProps = {
  id: string;
  position: [number, number, number];
  onHit: (id: string) => void;
};

const EnemyCube = ({ id, onHit, position }: EnemyCubeProps) => {
  const [life, setLife] = useState(100);

  const takeDamage = (amount: number) => {
    setLife((prev) => prev - amount);
  };

  useEffect(() => {
    if (life <= 0) {
      onHit(id);
    }
  }, [life]);

  const handleEnemyCharacterClick = (e: any) => {
    const clickedObject = e.object;

    if (clickedObject instanceof Mesh) {
      takeDamage(30);
    }
  };

  return (
    <>
      <EnemyCharacter
        position={position}
        onClick={handleEnemyCharacterClick}
        enemyId={id}
        onPointerDown={(e) => e.stopPropagation()}
      />
    </>
  );
};

export default EnemyCube;
