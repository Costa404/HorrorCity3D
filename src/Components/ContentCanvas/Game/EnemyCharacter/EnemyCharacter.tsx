import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EnemyCharacter = (props) => {
  const group = useRef();
  const { scene, animations } = useGLTF("src/assets/EnemyCharacter.glb");
  const { actions } = useAnimations(animations, group);

  const direction = useRef([Math.random() - 0.5, Math.random() - 0.5]);
  const timer = useRef(0);
  const restTimer = useRef(0);
  const [isResting, setIsResting] = useState(false);

  const speed = 2;
  const bounds = 5;

  useEffect(() => {
    if (actions["ArmatureAction"]) {
      actions["ArmatureAction"].reset().fadeIn(0.5).play();
    }

    // Clonando a cena para evitar problemas com a alteração da cena
    const clonedScene = scene.clone(true);

    // Aplique o clone ao grupo
    if (group.current) {
      group.current.add(clonedScene);
    }

    return () => {
      if (group.current) {
        group.current.remove(clonedScene); // Remover o clone ao desmontar
      }
    };
  }, [actions, scene]);

  useFrame((_, delta) => {
    if (!group.current) return;

    if (isResting) {
      restTimer.current += delta;
      if (restTimer.current > 2) {
        setIsResting(false);
        restTimer.current = 0;
        if (actions["ArmatureAction"]) actions["ArmatureAction"].play();
      }
      return;
    }

    if (Math.random() < 0.002) {
      setIsResting(true);
      if (actions["ArmatureAction"]) actions["ArmatureAction"].stop();
      return;
    }

    timer.current += delta;

    if (timer.current > 2) {
      direction.current = [Math.random() - 0.5, Math.random() - 0.5];
      timer.current = 0;
    }

    const moveX = direction.current[0] * speed * delta;
    const moveZ = direction.current[1] * speed * delta;
    const pos = group.current.position;

    if (Math.abs(pos.x + moveX) > bounds || Math.abs(pos.z + moveZ) > bounds) {
      direction.current = [Math.random() - 0.5, Math.random() - 0.5];
      return;
    }

    pos.x += moveX;
    pos.z += moveZ;

    const angle = Math.atan2(direction.current[1], direction.current[0]);
    group.current.rotation.y = -angle + Math.PI / 2;
  });

  return <primitive ref={group} object={scene} {...props} />;
};

export default EnemyCharacter;
