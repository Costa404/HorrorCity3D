import { useSwitchCameraStore } from "../Camera/useSwitchCameraStore";

import TrashContainerCamera from "../MainStreet/TrashContainerGroup/TrashContainerCamera";

import FirstPersonCamera from "../Camera/FirstPersonCamera/FirstPersonCamera";

const Cameras = () => {
  const { activeCamera, trashPositions, activeTrashId } =
    useSwitchCameraStore();

  return (
    <group>
      <FirstPersonCamera />

      {/* {activeCamera === "trashContainerView" && activeTrashId && (
        <TrashContainerCamera targetPosition={trashPositions[activeTrashId]} />
      )} */}
    </group>
  );
};

export default Cameras;
