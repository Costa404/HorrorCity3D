// import { useThree } from "@react-three/fiber";

// import { useEffect } from "react";
// import { useSwitchCamera } from "./useSwitchCameraStore";

// export const CameraSwitcher = () => {
//   const { camera } = useThree();
//   const { activeCamera } = useSwitchCamera(); // Pega o estado da câmera ativa

//   useEffect(() => {
//     if (activeCamera === "trashContainer") {
//       // Lógica para definir a posição da câmera do caixote de lixo
//       camera.position.set(0, 2, 5); // Exemplo de posição
//       camera.lookAt(0, 0, 0); // Olha para o centro do caixote
//     } else if (activeCamera === "firstPerson") {
//       // Lógica para a posição da câmera de primeira pessoa
//       camera.position.set(0, 1.5, 5); // Exemplo de posição
//       camera.lookAt(0, 1.5, 0); // Olha para o personagem
//     }
//   }, [activeCamera, camera]);

//   return null; // Esse componente só serve para alterar a posição da câmera
// };
