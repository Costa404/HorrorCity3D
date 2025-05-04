import LeftNavbar from "./Utility/LeftNavbar";

import Aim from "./Utility/Aim";
import { useLife } from "../ContentCanvas/Game/Life/useLife";
import ZoomOverlay from "./ZoomOverlay";
import { usePlayerStore } from "../ContentCanvas/Camera/FirstPersonCamera/Hooks/usePlayerStore";
import { useItemSwitchStore } from "../ContentCanvas/Game/UtilityGame/useItemSwitchStore";

const ContentOutsideCanvas = () => {
  const { currentItem } = useItemSwitchStore();

  const { isAwpZooming } = usePlayerStore();
  useLife();
  return (
    <>
      <Aim />
      <LeftNavbar />
      <ZoomOverlay active={isAwpZooming && currentItem === "awp"} />
    </>
  );
};

export default ContentOutsideCanvas;
