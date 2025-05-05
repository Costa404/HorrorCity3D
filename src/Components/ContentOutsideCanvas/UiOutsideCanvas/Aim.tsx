import { useItemSwitchStore } from "../../ContentCanvas/Game/UtilityGame/useItemSwitchStore";

const Aim = () => {
  const currentItem = useItemSwitchStore((s) => s.currentItem);

  return (
    <>
      {currentItem === "deagle" ? (
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
