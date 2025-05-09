// import { useThree } from "@react-three/fiber";
// import { useEffect } from "react";

// interface UseMiniMapBuildingsProps {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   MAP_SIZE: number;
//   scale: number;
// }

// export const useMiniMapBuildings = ({
//   canvasRef,
//   MAP_SIZE,
//   scale,
// }: UseMiniMapBuildingsProps) => {
//   const { scene } = useThree();

//   useEffect(() => {
//     let animationId: number;

//     const drawBuildings = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) {
//         animationId = requestAnimationFrame(drawBuildings);
//         return;
//       }

//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       // Limpa o canvas
//       ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

//       // Fundo semi-transparente para debug
//       ctx.fillStyle = "rgba(30, 60, 30, 0.7)";
//       ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

//       // Marcador central (verde)
//       ctx.fillStyle = "#00ff00";
//       ctx.fillRect(MAP_SIZE / 2 - 2, MAP_SIZE / 2 - 2, 4, 4);

//       // Debug: mostra os limites do canvas
//       ctx.strokeStyle = "#ffffff";
//       ctx.strokeRect(0, 0, MAP_SIZE, MAP_SIZE);

//       scene.traverse((obj) => {
//         if (obj.userData.isBuilding || (obj as any).isBuilding) {
//           // Cálculo de posição com fallback seguro
//           const posX = obj.position.x || 0;
//           const posZ = obj.position.z || 0; // Usamos Z para 3D (não Y)

//           // Cálculo de escala com valores mínimos
//           const scaleX = Math.max(obj.scale.x || 1, 0.5) * scale * 5; // 5x maior
//           const scaleZ = Math.max(obj.scale.z || 1, 0.5) * scale * 5;

//           const x = MAP_SIZE / 2 + posX * scale;
//           const y = MAP_SIZE / 2 + posZ * scale;

//           console.log(`Building at: ${x},${y} | Size: ${scaleX}x${scaleZ}`);

//           // Desenha o edifício
//           ctx.fillStyle = "#ff3366"; // Rosa forte para visibilidade
//           ctx.fillRect(x - scaleX / 2, y - scaleZ / 2, scaleX, scaleZ);

//           // Borda branca para contraste
//           ctx.strokeStyle = "#ffffff";
//           ctx.lineWidth = 1;
//           ctx.strokeRect(x - scaleX / 2, y - scaleZ / 2, scaleX, scaleZ);
//         }
//       });

//       animationId = requestAnimationFrame(drawBuildings);
//     };

//     animationId = requestAnimationFrame(drawBuildings);
//     return () => cancelAnimationFrame(animationId);
//   }, [scene, canvasRef, MAP_SIZE, scale]);
// };
