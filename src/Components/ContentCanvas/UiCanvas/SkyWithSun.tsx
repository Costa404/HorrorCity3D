// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { DirectionalLightHelper } from "three";
// import { useThree } from "@react-three/fiber";

// const SkyWithSun = () => {
//   const sunRef = useRef<THREE.Mesh>(null);
//   const directionalLightRef = useRef<THREE.DirectionalLight>(null);
//   const { scene } = useThree();

//   useEffect(() => {
//     if (directionalLightRef.current) {
//       const helper = new DirectionalLightHelper(
//         directionalLightRef.current,
//         20,
//         0xffff00
//       );
//       scene.add(helper);
//     }
//   }, [scene]);

//   return (
//     <group>
//       {/* Sol  */}
//       <mesh ref={sunRef} position={[0, 2000, 0]}>
//         <sphereGeometry args={[40, 64, 64]} />
//         <meshStandardMaterial
//           color="#FFFF00"
//           emissive="#FFFF33"
//           emissiveIntensity={2}
//         />
//       </mesh>
//       {/* <directionalLight
//         ref={directionalLightRef}
//         color="#ffffee"
//         intensity={2}
//         position={[0, 10, 0]} // alinhado com o sol visual
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-near={1}
//         shadow-camera-far={1000}
//         shadow-camera-left={-200}
//         shadow-camera-right={200}
//         shadow-camera-top={200}
//         shadow-camera-bottom={-200}
//       /> */}
//       {/* <spotLight
//         position={[-40, 30, 0]} // Posição mais próxima e mais alta
//         angle={Math.PI / 2} // Ângulo menor
//         penumbra={1}
//         intensity={100} // Intensidade aumentada
//         distance={70} // Distância aumentada
//         decay={1} // Decay mais suave
//         color="#ffffff"
//         castShadow
//         target-position={[0, 0, -30]} // Para onde a luz está apontando
//       /> */}
//       *
//       <ambientLight intensity={2} color="#ffffff" />
//     </group>
//   );
// };

// export default SkyWithSun;
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";

const SkyWithSun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const { scene } = useThree();

  useEffect(() => {
    // Configura o fundo da cena para preto
    scene.background = new THREE.Color(0x000000); // Cor preta de fundo

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
      {/* Sol */}
      <mesh ref={sunRef} position={[0, 2000, 0]}>
        <sphereGeometry args={[40, 64, 64]} />
        <meshStandardMaterial
          color="#FFFF00"
          emissive="#FFFF33"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Céu - noite */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[5000, 64, 64]} />
        <meshBasicMaterial color="#1a1a4b" side={THREE.BackSide} />
      </mesh>

      {/* Luz ambiente */}
      <ambientLight intensity={0} color="#ffffff" />

      {/* Luz direcional */}
      {/* <directionalLight
        ref={directionalLightRef}
        color="#ffffee"
        intensity={1}
        position={[0, 10, 0]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      /> */}
    </group>
  );
};

export default SkyWithSun;
