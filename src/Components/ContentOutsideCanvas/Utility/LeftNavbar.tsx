import { FaRegHand } from "react-icons/fa6";
import { GiPistolGun } from "react-icons/gi";
import { useItemSwitchStore } from "../../ContentCanvas/Game/UtilityGame/HooksGame/useItemSwitchStore";
import LifeBar from "../LifeBar";
import DisplayBullets from "./DisplayBullets";

const LeftNavbar = () => {
  const { currentItem, setItem } = useItemSwitchStore();

  return (
    <div
      className="position-fixed d-flex  flex-column  justify-content-end h-75 pb-5 gap-5"
      style={{
        top: 20,
        left: 20,
        zIndex: 1000,
      }}
    >
      <GiPistolGun
        onClick={() => setItem("gun")}
        color={currentItem === "gun" ? "white" : "gray"}
        size={30}
        style={{ cursor: "pointer" }}
      />
      <FaRegHand
        onClick={() => setItem("hands")}
        color={currentItem === "hands" ? "white" : "gray"}
        size={30}
        style={{ cursor: "pointer" }}
      />
      <DisplayBullets />
      <LifeBar />
    </div>
  );
};
export default LeftNavbar;
