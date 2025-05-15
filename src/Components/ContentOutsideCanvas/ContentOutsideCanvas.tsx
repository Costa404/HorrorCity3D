import LeftNavbar from "./UiOutsideCanvas/LeftNavbar/LeftNavbar";

import Aim from "./UiOutsideCanvas/Aim";
import { useLife } from "../ContentCanvas/Game/Life/useLife";
import ZoomOverlay from "./UiOutsideCanvas/ZoomOverlay";
import { usePlayerStore } from "../ContentCanvas/Camera/FirstPersonCamera/Hooks/usePlayerStore";
import { useItemSwitchStore } from "../ContentCanvas/Game/UtilityGame/useItemSwitchStore";
import BtnLadder from "./UiOutsideCanvas/BtnLadder";
import { useLadderControl } from "../ContentCanvas/Game/UtilityGame/ClimbingLadder/useLadderControl";
import { useStartGameStore } from "../useStartGameStore";
import KilledEnemiesCount from "./UiOutsideCanvas/KilledEnemiesCount";

const ContentOutsideCanvas = () => {
  const showGameScene = useStartGameStore((s) => s.showGameScene);
  const isAwpZooming = usePlayerStore((s) => s.isAwpZooming);
  const currentItem = useItemSwitchStore((s) => s.currentItem);
  const { buttonText, setClimbingLadder } = useLadderControl();
  const handleButtonClick = () => {
    setClimbingLadder((prev) => !prev);
  };
  // console.log("ola");

  useLife();
  return (
    <div
      style={{
        visibility: showGameScene ? "visible" : "hidden",
        transition: "visibility 0s 0.5s",
      }}
    >
      {buttonText && (
        <BtnLadder buttonText={buttonText} onClick={handleButtonClick} />
      )}
      <Aim />
      <LeftNavbar />
      <ZoomOverlay active={isAwpZooming && currentItem === "awp"} />
      <KilledEnemiesCount />
    </div>
  );
};

export default ContentOutsideCanvas;
