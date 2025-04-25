import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import EnemyCube from "./Enemy";

type Enemy = {
  id: string;
  position: [number, number, number];
  health: number;
};

const Game = () => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: "enemy1", position: [5, 1, -10], health: 100 },
    { id: "enemy2", position: [3, 1, -8], health: 100 },
  ]);

  const shoot = () => {
    raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    console.log(
      "Intersects:",
      intersects.map((i) => i.object)
    );

    const shotSound = new Audio("src/assets/Sounds/gunShot.ogg");
    shotSound.play();

    for (let hit of intersects) {
      const obj = hit.object;

      if (obj.userData.enemyId) {
        const enemyId = obj.userData.enemyId;

        setEnemies((prev) => {
          return prev.map((enemy) => {
            if (enemy.id === enemyId) {
              const newHealth = enemy.health - 30;
              if (newHealth <= 0) {
                console.log(`${enemy.id} morreu.`);
              } else {
                console.log(`${enemy.id}: ${newHealth} de vida`);
              }
              return { ...enemy, health: newHealth };
            }
            return enemy;
          });
        });
        break;
      }
    }
  };

  // Remover inimigos com vida <= 0 e logar
  useEffect(() => {
    const vivos = enemies.filter((e) => e.health > 0);
    const mortos = enemies.filter((e) => e.health <= 0);

    mortos.forEach((enemy) => console.log(`${enemy.id} morreu.`));
    vivos.forEach((enemy) =>
      console.log(`${enemy.id}: ${enemy.health} de vida`)
    );

    // Só atualiza se tiver mortos
    if (mortos.length > 0) {
      setEnemies(vivos);
    }
  }, [enemies]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) shoot(); // botão esquerdo
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <>
      {enemies.map((enemy) => (
        <EnemyCube
          key={enemy.id}
          id={enemy.id}
          position={enemy.position}
          onHit={(id: string) => {
            console.log(`${id} morreu (via onHit)`); // ou outra lógica que você queira
            setEnemies((prev) => prev.filter((e) => e.id !== id));
          }}
        />
      ))}
    </>
  );
};

export default Game;
