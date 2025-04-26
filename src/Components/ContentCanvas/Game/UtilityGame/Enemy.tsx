import { useEffect, useState } from "react";

type EnemyCubeProps = {
  id: string;
  position: [number, number, number];
  onHit: (id: string) => void;
};

const EnemyCube = ({ position, id, onHit }: EnemyCubeProps) => {
  const [life, setLife] = useState(100);

  const takeDamage = (amount: number) => {
    setLife((prev) => prev - amount);
  };

  useEffect(() => {
    if (life <= 0) {
      onHit(id);
    }
  }, [life]);

  return (
    <>
      {/* <mesh
      position={position}
      userData={{ enemyId: id }}
      onClick={() => takeDamage(30)}
      >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={life > 0 ? "red" : "gray"} />
    </mesh> */}
    </>
  );
};

export default EnemyCube;
