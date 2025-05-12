import { useState } from "react";
import StartScreen from "./Components/ContentOutsideCanvas/StartScreen";
import { useStartGameStore } from "./Components/useStartGameStore";
import GameScene from "./Components/GameScene";

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
