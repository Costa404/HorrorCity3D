import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Hands = () => {
  const { camera, scene } = useThree();
  const handsGroup = useRef<THREE.Group>(new THREE.Group());

  const { scene: handsModel } = useGLTF("src/assets/hands.glb");
  useEffect(() => {
    scene.add(handsGroup.current);

    return () => {
      scene.remove(handsGroup.current);
    };
  }, [scene]);

  useFrame(() => {
    const cam = camera;
    const group = handsGroup.current;

    group.position.copy(cam.position);
    group.quaternion.copy(cam.quaternion);

    // camera positon
    group.translateX(0);
    group.translateY(-0.6);
    group.translateZ(-1.1);
  });

  return (
    <primitive object={handsGroup.current}>
      <primitive object={handsModel} scale={[0.3, 0.3, 0.3]} />
    </primitive>
  );
};

export default Hands;
