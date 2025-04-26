import { useItemSwitchStore } from "../../ContentCanvas/Game/UtilityGame/HooksGame/useItemSwitchStore";

const Aim = () => {
  const { currentItem } = useItemSwitchStore();
  return (
    <>
      {currentItem === "gun" ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            fontSize: "32px",
            color: "white",
          }}
        >
          +
        </div>
      ) : null}
    </>
  );
};

export default Aim;
