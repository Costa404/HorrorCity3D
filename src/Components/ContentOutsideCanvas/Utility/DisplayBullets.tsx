import { GiGunshot } from "react-icons/gi";
import { useGunStore } from "../../ContentCanvas/Game/Gun/GunHooks/useGunStore";

const DisplayBullets = () => {
  const bullets = useGunStore((state) => state.bullets);
  const isEmpty = bullets === 0;

  return (
    <div
      className="d-flex align-items-center gap-2"
      style={{
        fontSize: "3rem ",
        color: isEmpty ? "red" : "white",
      }}
    >
      <GiGunshot />
      <span
        style={{
          fontSize: "3rem",
          color: isEmpty ? "red" : "white",
        }}
      >
        {bullets}
      </span>
    </div>
  );
};

export default DisplayBullets;
