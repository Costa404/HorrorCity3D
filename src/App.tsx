import { useState } from "react";
import MyCity from "./Components/ContentCanvas/MyCity";
import ContentOutsideCanvas from "./Components/ContentOutsideCanvas/ContentOutsideCanvas";
import StartScreen from "./Components/ContentOutsideCanvas/StartScreen";
import { useStartGameStore } from "./Components/useStartGameStore";
import GameScene from "./Components/GameScene";
import MiniMap2D from "./Components/ContentCanvas/MiniMap2D/MiniMap2D";

const App = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const setShowGameScene = useStartGameStore((state) => state.setShowGameScene);

  const handleClick = () => {
    setHasGameStarted(true);
    setShowGameScene(true);
  };
  return (
    <>
      {!hasGameStarted && <StartScreen onStart={handleClick} />}
      <GameScene />
    </>
  );
};

export default App;
