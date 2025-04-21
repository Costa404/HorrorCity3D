import { useState, useEffect, useRef } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { Vector3 } from "three";

export const useMovement = () => {
  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);

  const jumpVelocity = 4;
  const speed = 14;

  const direction = useRef(new Vector3());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const moveCharacter = (rigidBody: RapierRigidBody) => {
    if (!rigidBody) return;

    direction.current.set(0, 0, 0);
    let moving = false;

    if (keysPressed["ArrowUp"] || keysPressed["w"]) {
      direction.current.x -= 1;
      moving = true;
    }
    if (keysPressed["ArrowDown"] || keysPressed["s"]) {
      direction.current.x += 1;
      moving = true;
    }
    if (keysPressed["ArrowRight"] || keysPressed["d"]) {
      direction.current.z += 1; // Movimento  para a direitad
      moving = true;
    }
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
      direction.current.z -= 1; // Movimento  para a esquerda
      moving = true;
    }

    // Aplica o movimento no eixo x (lateral) e z (frente/trás)
    if (direction.current.lengthSq() > 0) {
      direction.current.normalize().multiplyScalar(speed);
      rigidBody.setLinvel(
        {
          x: direction.current.x, // Movimento lateral aplicado no eixo x
          y: rigidBody.linvel().y,
          z: direction.current.z, // Movimento frente/trás aplicado no eixo z
        },
        true
      );
    } else {
      rigidBody.setLinvel({ x: 0, y: rigidBody.linvel().y, z: 0 }, true);
    }

    setIsWalking(moving);

    // SALT
    if ((keysPressed[" "] || keysPressed["Space"]) && !isJumping) {
      rigidBody.setLinvel(
        { x: direction.current.x, y: jumpVelocity, z: direction.current.z },
        true
      );
      setIsJumping(true);
    }

    if (rigidBody.translation().y <= 0.41) {
      setIsJumping(false);
    }
  };

  return {
    keysPressed,
    isJumping,
    isWalking,
    moveCharacter,
  };
};
