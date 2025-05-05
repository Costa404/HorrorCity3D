import LeftNavbar from "./UiOutsideCanvas/LeftNavbar/LeftNavbar";

import Aim from "./UiOutsideCanvas/Aim";
import { useLife } from "../ContentCanvas/Game/Life/useLife";
import ZoomOverlay from "./UiOutsideCanvas/ZoomOverlay";
import { usePlayerStore } from "../ContentCanvas/Camera/FirstPersonCamera/Hooks/usePlayerStore";
import { useItemSwitchStore } from "../ContentCanvas/Game/UtilityGame/useItemSwitchStore";
import BtnLadder from "./UiOutsideCanvas/BtnLadder";
import { useLadderControl } from "../ContentCanvas/Game/UtilityGame/ClimbingLadder/useLadderControl";

const ContentOutsideCanvas = () => {
  const isAwpZooming = usePlayerStore((s) => s.isAwpZooming);
  const currentItem = useItemSwitchStore((s) => s.currentItem);
  const { buttonText, setClimbingLadder } = useLadderControl();
  const handleButtonClick = () => {
    setClimbingLadder((prev) => !prev);
  };
  // console.log("ola");

  useLife();
  return (
    <>
      {buttonText && (
        <BtnLadder buttonText={buttonText} onClick={handleButtonClick} />
      )}
      <Aim />
      <LeftNavbar />
      <ZoomOverlay active={isAwpZooming && currentItem === "awp"} />
    </>
  );
};

export default ContentOutsideCanvas;
