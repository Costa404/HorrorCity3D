import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

import { useCameraStore } from "../Camera/useCameraStore";
import { useMovement } from "./Hooks/useMovement";

const MainCharacter = forwardRef<
  Group,
  { position?: [number, number, number] }
>(({ position = [0, 0, 0] }, ref) => {
  const groupRef = useRef<Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { moveCharacter } = useMovement();

  const setTarget = useCameraStore((state) => state.setTarget);
  const gltf = useGLTF("src/assets/humanoid.glb");

  useImperativeHandle(ref, () => groupRef.current!, []);

  // Define o personagem como alvo da câmera
  useEffect(() => {
    if (groupRef.current) {
      setTarget(groupRef.current);
    }
  }, [setTarget]);

  // Atualiza posição visual com base na física + aplica movimento
  useFrame(() => {
    if (rigidBodyRef.current && groupRef.current) {
      // n precisa atualizar posição aqui, já está dentro do RigidBody
      moveCharacter(rigidBodyRef.current);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      colliders="cuboid"
      position={[position[0], 0, position[2]]}
      enabledRotations={[false, false, false]}
    >
      <group ref={groupRef}>
        <primitive object={gltf.scene} />
      </group>
    </RigidBody>
  );
});

export default MainCharacter;
