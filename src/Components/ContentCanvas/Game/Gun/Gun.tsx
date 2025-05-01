import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Gun = () => {
  const { camera, scene } = useThree();
  const gunGroup = useRef<THREE.Group>(new THREE.Group());

  const { scene: model } = useGLTF("src/assets/deagle.glb");

  useEffect(() => {
    const gun = gunGroup.current;

    scene.add(gun);

    return () => {
      scene.remove(gun);
    };
  }, [scene]);

  useFrame(() => {
    const cam = camera;
    const group = gunGroup.current;

    group.position.copy(cam.position);
    group.quaternion.copy(cam.quaternion);

    group.translateX(1);
    group.translateY(-0.9);
    group.translateZ(-2.1);
  });

  return (
    <primitive object={gunGroup.current}>
      <primitive
        object={model}
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, 0, Math.PI]}
      />
    </primitive>
  );
};

export default Gun;
