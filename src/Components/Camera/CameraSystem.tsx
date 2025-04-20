import { useFrame, useThree } from "@react-three/fiber";
import { useCameraStore } from "./useCameraStore";
import { Vector3 } from "three";

export const CameraSystem = () => {
  const { camera } = useThree();
  const { target, cameraOffset } = useCameraStore();

  const smoothCameraPosition = new Vector3();
  const smoothCameraTarget = new Vector3();

  useFrame(() => {
    if (target) {
      const desiredPosition = target.position.clone().add(cameraOffset);
      const desiredTarget = target.position.clone();

      smoothCameraPosition.lerp(desiredPosition, 0.1);
      camera.position.copy(smoothCameraPosition);

      smoothCameraTarget.lerp(desiredTarget, 0.1);
      camera.lookAt(smoothCameraTarget);
    }
  });

  return null;
};
