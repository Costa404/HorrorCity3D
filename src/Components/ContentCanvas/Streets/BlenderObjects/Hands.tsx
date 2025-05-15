// import { useGLTF } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// const Hands = () => {
//   const { scene: handModel } = useGLTF("src/assets/hands.glb");
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     handModel.traverse((child) => {
//       if ((child as THREE.Mesh).isMesh) {
//         (child as THREE.Mesh).material.transparent = false;
//         (child as THREE.Mesh).material.opacity = 1;
//         child.visible = true;
//       }
//     });
//   }, [handModel]);

//   return (
//     <group ref={groupRef} position={[0, -0.5, -1]} scale={[10, 10, 10]}>
//       <primitive object={handModel.clone()} />
//     </group>
//   );
// };
// export default Hands;
