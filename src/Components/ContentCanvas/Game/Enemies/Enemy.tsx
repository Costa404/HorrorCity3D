import { useRef } from "react";
import { Mesh } from "three";
import EnemyCharacter from "./EnemyCharacter/EnemyCharacter";

type EnemyProps = {
  id: string;
};

const Enemy = ({ id }: EnemyProps) => {
  const lifeRef = useRef(100); // Usei useRef para manter o valor sem rerenderização

  const takeDamage = (amount: number) => {
    lifeRef.current -= amount; // Atualiza diretamente o valor do ref
  };

  const handleEnemyCharacterClick = (e: any) => {
    const clickedObject = e.object;

    if (clickedObject instanceof Mesh) {
      takeDamage(30); // Aplica dano ao inimigo
    }
  };

  return (
    <>
      <EnemyCharacter
        onClick={handleEnemyCharacterClick}
        enemyId={id}
        onPointerDown={(e) => e.stopPropagation()}
      />
    </>
  );
};

export default Enemy;
