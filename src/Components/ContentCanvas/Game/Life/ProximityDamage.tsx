import { useEnemyPositionStore } from "../Enemies/EnemyCharacter/Hooks/useEnemyPosStore";
import useProximityDamage from "./useProximityDamage";

const ProximityDamage = () => {
  const enemiesPosition = useEnemyPositionStore((s) => s.enemiesPosition);
  // console.log("enemiesPosition", enemiesPosition);

  const enemiesArray = Object.values(enemiesPosition).map((pos) => ({
    position: [pos.x, pos.y, pos.z] as [number, number, number],
  }));

  useProximityDamage(enemiesArray, 20, 100);

  return null;
};

export default ProximityDamage;
