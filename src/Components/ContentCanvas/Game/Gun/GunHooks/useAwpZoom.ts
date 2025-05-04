import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { usePlayerStore } from "../../../Camera/FirstPersonCamera/Hooks/usePlayerStore";
import { useItemSwitchStore } from "../../UtilityGame/useItemSwitchStore";

export const useAwpZoom = () => {
  const { camera } = useThree();
  const { setisAwpZooming, isAwpZooming } = usePlayerStore();
  const { currentItem } = useItemSwitchStore();
  const originalFov = useRef<number | null>(null);

  useEffect(() => {
    // só é para dar  zoom se for awp
    if (currentItem === "hands" || currentItem === "deagle") return;
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 2) return;

      if (!(camera instanceof THREE.PerspectiveCamera)) return;

      if (!isAwpZooming) {
        originalFov.current = camera.fov;
        camera.fov = originalFov.current * 0.5;
        camera.updateProjectionMatrix();
      } else {
        if (originalFov.current !== null) {
          camera.fov = originalFov.current;
          camera.updateProjectionMatrix();
        }
      }

      setisAwpZooming(!isAwpZooming);
    };

    const blockContextMenu = (e: MouseEvent) => e.preventDefault();

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("contextmenu", blockContextMenu);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("contextmenu", blockContextMenu);
    };
  }, [camera, setisAwpZooming, isAwpZooming, currentItem]);

  return null;
};
