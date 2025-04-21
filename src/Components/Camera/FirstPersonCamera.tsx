import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";

const MOVEMENT_SPEED = 5;
const MOUSE_SENSITIVITY = 0.002;

const FirstPersonCamera = () => {
  const { camera } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());

  // Configura a posição inicial da câmera
  useEffect(() => {
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "ArrowUp") moveForward.current = true;
      if (e.key === "s" || e.key === "ArrowDown") moveBackward.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "ArrowUp") moveForward.current = false;
      if (e.key === "s" || e.key === "ArrowDown") moveBackward.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!document.pointerLockElement) return;

      camera.rotation.y -= e.movementX * MOUSE_SENSITIVITY;
      camera.rotation.x -= e.movementY * MOUSE_SENSITIVITY;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );
    };

    const handleClick = () => {
      if (!document.pointerLockElement) {
        document.body.requestPointerLock();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [camera]);

  useFrame((_, delta) => {
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    direction.current.z =
      Number(moveForward.current) - Number(moveBackward.current);
    direction.current.normalize();

    if (moveForward.current || moveBackward.current) {
      velocity.current.z -= direction.current.z * MOVEMENT_SPEED * delta;
    }

    camera.translateZ(velocity.current.z);
  });

  return null;
};

export default FirstPersonCamera;
