import { useRef, useEffect } from "react";
import * as THREE from "three";
import { DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";

const SkyWithSun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new DirectionalLightHelper(
        directionalLightRef.current,
        20,
        0xffff00
      );
      scene.add(helper);
    }
  }, [scene]);

  return (
    <group>
      {/* Céu
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[10000, 128, 128]} />
        <meshStandardMaterial
          color="#87CEEB"
          side={THREE.BackSide}
          emissive="#87CEEB"
          emissiveIntensity={0.3}
        />
      </mesh> */}

      {/* Sol  */}
      <mesh ref={sunRef} position={[0, 2000, 0]}>
        <sphereGeometry args={[40, 64, 64]} />
        <meshStandardMaterial
          color="#FFFF00"
          emissive="#FFFF33"
          emissiveIntensity={2}
        />
      </mesh>

      <directionalLight
        ref={directionalLightRef}
        color="#ffffee"
        intensity={2}
        position={[0, 500, 0]} // alinhado com o sol visual
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />

      <ambientLight intensity={0.8} color="#ffffff" />
    </group>
  );
};

export default SkyWithSun;
