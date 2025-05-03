import LeftNavbar from "./Utility/LeftNavbar";

import Aim from "./Utility/Aim";
import { useLife } from "../ContentCanvas/Game/Life/useLife";

const ContentOutsideCanvas = () => {
  useLife();
  return (
    <>
      <Aim />
      <LeftNavbar />
    </>
  );
};

export default ContentOutsideCanvas;
