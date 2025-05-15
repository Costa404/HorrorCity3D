import React from "react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { useEnemyStore } from "../../ContentCanvas/Game/Enemies/EnemyCharacter/Hooks/useEnemyStore";

const KilledEnemiesCount = () => {
  const enemies = useEnemyStore((s) => s.enemies);
  // 7 porque são 7 inimigos no total
  const totalEnemies = 7;
  const killedEnemies = totalEnemies - enemies.length;

  return (
    <div
      className="position-fixed top-0 end-0 m-3 d-flex align-items-center gap-2 p-3 bg-dark text-white rounded"
      style={{ zIndex: 1000 }}
    >
      <p className="mb-0 fs-3">{killedEnemies}</p>
      <FaSkullCrossbones color="red" size={32} />
    </div>
  );
};

export default KilledEnemiesCount;
