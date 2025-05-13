import { FaRegHand } from "react-icons/fa6";
import { GiPistolGun, GiSawedOffShotgun } from "react-icons/gi";

import LifeBar from "./LifeBar";
import DisplayBullets from "./DisplayBullets";
import { useItemSwitchStore } from "../../../ContentCanvas/Game/UtilityGame/useItemSwitchStore";
import { IoIosFlashlight } from "react-icons/io";
import { useFlashlightStore } from "../../../ContentCanvas/Game/UtilityGame/Flashlight/useFlashlightStore";

const LeftNavbar = () => {
  const currentItem = useItemSwitchStore((s) => s.currentItem);
  const setItem = useItemSwitchStore((s) => s.setItem);
  const isFlashlightOn = useFlashlightStore((s) => s.isFlashlightOn);

  return (
    <div
      className="position-fixed d-flex  flex-column  justify-content-end h-75 pb-5 gap-5"
      style={{
        top: 20,
        left: 20,
        zIndex: 1000,
      }}
    >
      <GiSawedOffShotgun
        onClick={() => setItem("awp")}
        color={currentItem === "awp" ? "white" : "gray"}
        size={30}
      />
      <GiPistolGun
        onClick={() => setItem("deagle")}
        color={currentItem === "deagle" ? "white" : "gray"}
        size={30}
        style={{ cursor: "pointer" }}
      />
      <FaRegHand
        onClick={() => setItem("hands")}
        size={30}
        color={currentItem === "hands" ? "white" : "gray"}
        style={{ cursor: "pointer" }}
      />

      <IoIosFlashlight
        color={isFlashlightOn === true ? "white" : "gray"}
        size={30}
      />

      <DisplayBullets />
      <LifeBar />
    </div>
  );
};
export default LeftNavbar;
