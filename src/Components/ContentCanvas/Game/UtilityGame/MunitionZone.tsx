import { CuboidCollider } from "@react-three/rapier";

import { useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useGunStore } from "../Gun/GunHooks/useGunStore";

const MunitionZone = () => {
  const [getBullets, setGetBullets] = useState(true);
  const { addBullets } = useGunStore();

  const { scene } = useGLTF("src/assets/bullets.glb");

  const cloned = useMemo(() => {
    if (scene) {
      return scene.clone();
    }
    return null;
  }, [scene]);

  const handleEnterZone = () => {
    addBullets(5);
    setGetBullets(false);
  };

  if (!getBullets) {
    return null; // Não renderiza nada se as balas ja tiverem sido apanhadas
  }
  return (
    <>
      <group position={[-100, 0, 0]}>
        <CuboidCollider
          args={[2.2, 2.0, 3.2]}
          sensor
          onIntersectionEnter={handleEnterZone}
        />
        {cloned && <primitive object={cloned} scale={[1, 1, 1]} />}
      </group>
    </>
  );
};

export default MunitionZone;
