import React from "react";
import { useSwitchCameraStore } from "../Camera/useSwitchCameraStore";
import FirstPersonCamera from "../Camera/FirstPersonCamera/FirstPersonCamera";
import TrashContainerCamera from "../MainStreet/TrashContainerGroup/TrashContainerCamera";

const Cameras = () => {
  const { activeCamera, trashPositions, activeTrashId } =
    useSwitchCameraStore();
  console.log("activeCamera", activeCamera);

  return (
    <group>
      {/* Só renderiza a FirstPersonCamera se a câmera ativa for 'firstPerson' */}
      {activeCamera === "firstPerson" && <FirstPersonCamera />}
      {/* <FirstPersonCamera /> */}
      {/* Só renderiza a TrashContainerCamera se a câmera ativa for 'trashContainerView' */}
      {activeCamera === "trashContainerView" && activeTrashId && (
        <TrashContainerCamera targetPosition={trashPositions[activeTrashId]} />
      )}

      {/* Aqui você pode adicionar outras câmeras ou objetos baseados no estado activeCamera */}
    </group>
  );
};

export default Cameras;
