import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const MOUSE_SENSITIVITY = 0.002;

export const useMouseControls = () => {
  const { camera, gl } = useThree();

  const setupMouseListeners = () => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!document.pointerLockElement) return;

      let yaw = camera.rotation.y - e.movementX * MOUSE_SENSITIVITY;
      let pitch = camera.rotation.x - e.movementY * MOUSE_SENSITIVITY;

      pitch = THREE.MathUtils.clamp(
        pitch,
        -Math.PI / 2 + 0.01,
        Math.PI / 2 - 0.01
      );
      yaw = THREE.MathUtils.clamp(yaw, -Math.PI, Math.PI);

      camera.rotation.set(pitch, yaw, 0);
    };

    const requestLock = () => {
      if (!document.pointerLockElement) {
        gl.domElement.requestPointerLock();
      }
    };

    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("click", requestLock);

    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("click", requestLock);
    };
  };

  return { setupMouseListeners };
};
