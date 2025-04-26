import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Gun = () => {
  const { camera, scene } = useThree();
  const gunGroup = useRef<THREE.Group>(new THREE.Group());

  const { scene: model } = useGLTF("src/assets/trashContainer.glb");

  useEffect(() => {
    scene.add(gunGroup.current);
    return () => scene.remove(gunGroup.current);
  }, [scene]);

  useFrame(() => {
    const cam = camera;
    const group = gunGroup.current;

    group.position.copy(cam.position);
    group.quaternion.copy(cam.quaternion);

    group.translateX(0);
    group.translateY(-0.3);
    group.translateZ(-1.1);
  });

  return (
    <primitive object={gunGroup.current}>
      <primitive scale={[0.03, 0.3, 0.3]} object={model} />
    </primitive>
  );
};

export default Gun;
