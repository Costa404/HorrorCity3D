import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useSwitchCameraStore } from "../../Camera/useSwitchCameraStore";
import * as THREE from "three";

export const useCameraForTrashContainer = ({
  cameraRef,
  isInTrashContainer,
  trashPosition,
}: {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  isInTrashContainer: boolean;
  trashPosition: THREE.Vector3;
}) => {
  const { setActiveCamera, activeCamera } = useSwitchCameraStore();
  const { camera } = useThree();

  useEffect(() => {
    if (isInTrashContainer && activeCamera !== "trashContainerView") {
      setActiveCamera("trashContainerView");

      if (cameraRef.current) {
        const offset = new THREE.Vector3(0, 2, 5);
        const cameraPosition = trashPosition.clone().add(offset);
        cameraRef.current.position.copy(cameraPosition);
        cameraRef.current.lookAt(trashPosition);
      }
    }
  }, [
    isInTrashContainer,
    setActiveCamera,
    trashPosition,
    cameraRef,
    activeCamera,
  ]);
};
