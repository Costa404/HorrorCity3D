import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

interface UseMiniMapBuildingsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  MAP_SIZE: number;
  scale: number;
}

export const useMiniMapBuildings = ({
  canvasRef,
  MAP_SIZE,
  scale,
}: UseMiniMapBuildingsProps) => {
  const { scene } = useThree();

  useEffect(() => {
    const drawMinimap = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        requestAnimationFrame(drawMinimap); // Espera até que o canvas exista
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.warn("Canvas context não disponível.");
        return;
      }

      // Fundo do minimapa
      ctx.fillStyle = "#2a5c2a";
      ctx.fillRect(1, 1, MAP_SIZE, MAP_SIZE);

      console.log("Objetos na cena:", scene.children.length);

      scene.children.forEach((obj, index) => {
        console.log(
          `Objeto ${index}:`,
          obj.name || obj.type,
          obj.position,
          obj.scale
        );

        if ((obj as any).isBuilding) {
          console.log(`Desenhando prédio: ${obj.name || obj.type}`);

          ctx.fillStyle = "#777";
          ctx.fillRect(
            MAP_SIZE / 2 + (obj.position.x - obj.scale.x / 2) * scale,
            MAP_SIZE / 2 + (obj.position.z - obj.scale.z / 2) * scale,
            obj.scale.x * scale,
            obj.scale.z * scale
          );
        }
      });
    };

    requestAnimationFrame(drawMinimap);
  }, [scene.children, canvasRef, MAP_SIZE, scale]);
};
