import { CuboidCollider } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import { useGunStore } from "../useGunStore";

const MunitionZone = () => {
  const zoneRef = useRef();
  const { addBullets } = useGunStore(); // Usando a função addBullets da store

  // Função para adicionar loot quando o jogador entra na zona
  const handleEnterZone = () => {
    // Atualiza as balas com a quantidade de munição pegada
    addBullets(5); // Adiciona 5 balas quando pega a munição
    console.log("Munição coletada!");
  };

  return (
    <>
      {/* Zona onde a colisão acontece */}
      <CuboidCollider
        ref={zoneRef}
        args={[2.2, 2.0, 3.2]}
        sensor
        onIntersectionEnter={handleEnterZone} // Quando o jogador colide com a zona
      />

      {/* Renderizando a munição na posição (0, 0, 0) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[20.2, 20.2, 20.2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
};

export default MunitionZone;
