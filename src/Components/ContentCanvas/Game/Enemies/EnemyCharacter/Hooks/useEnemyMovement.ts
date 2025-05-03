import { useRef, useState } from "react";

export const useEnemyMovement = (actions, speed = 10, mapSize = 250) => {
  const direction = useRef([Math.random() - 0.5, Math.random() - 0.5]);
  const timer = useRef(0);
  const restTimer = useRef(0);
  const [isResting, setIsResting] = useState(false);

  const updatePosition = (group, delta) => {
    if (!group) return;

    // Pausa aleatória
    if (isResting) {
      restTimer.current += delta;
      if (restTimer.current > 2) {
        setIsResting(false);
        restTimer.current = 0;
        if (actions?.ArmatureAction) actions.ArmatureAction.play();
      }
      return;
    }

    // Pausa aleatória
    if (Math.random() < 0.002) {
      setIsResting(true);
      if (actions?.ArmatureAction) actions.ArmatureAction.stop();
      return;
    }

    // Direção aleatória a cada 5 segundos
    timer.current += delta;
    if (timer.current > 5) {
      direction.current = [Math.random() - 0.5, Math.random() - 0.5];
      timer.current = 0;
    }

    const moveX = direction.current[0] * speed * delta;
    const moveZ = direction.current[1] * speed * delta;
    const pos = group.position;

    if (
      Math.abs(pos.x + moveX) > mapSize / 2 ||
      Math.abs(pos.z + moveZ) > mapSize / 2
    ) {
      direction.current = [Math.random() - 0.5, Math.random() - 0.5];
      return;
    }

    // Atualiza a posição
    pos.x += moveX;
    pos.z += moveZ;

    // Atualiza a rotação
    const angle = Math.atan2(direction.current[1], direction.current[0]);
    group.rotation.y = -angle + Math.PI / 2;
  };

  return updatePosition;
};
