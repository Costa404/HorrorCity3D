import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useAwpZoom } from "./GunHooks/useAwpZoom";

const Awp = () => {
  useAwpZoom();
  const { camera, scene } = useThree();
  const awpGroup = useRef<THREE.Group>(new THREE.Group());

  const { scene: model } = useGLTF("src/assets/awp.glb");

  useEffect(() => {
    const awp = awpGroup.current;
    scene.add(awp);

    return () => {
      scene.remove(awp);
    };
  }, [scene]);

  useFrame(() => {
    const cam = camera;
    const group = awpGroup.current;

    group.position.copy(cam.position);
    group.quaternion.copy(cam.quaternion);

    group.translateX(1);
    group.translateY(-0.9);
    group.translateZ(-1.8);
  });

  return (
    <primitive object={awpGroup.current}>
      <primitive
        object={model}
        scale={[1, 1, 1]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </primitive>
  );
};

export default Awp;
