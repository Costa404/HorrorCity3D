import React from "react";
import MyCity from "./ContentCanvas/MyCity";
import ContentOutsideCanvas from "./ContentOutsideCanvas/ContentOutsideCanvas";
import { useStartGameStore } from "./useStartGameStore";

const GameScene = () => {
  const { hasGameStarted } = useStartGameStore();

  // Renderiza os dois componentes apenas quando o jogo começar
  return (
    <>
      <div>
        <MyCity />
        <ContentOutsideCanvas />
      </div>
    </>
  );
};

export default GameScene;
