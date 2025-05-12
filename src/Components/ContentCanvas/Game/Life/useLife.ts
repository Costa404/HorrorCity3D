import { useRef, useEffect } from "react";
import { setRemoveLifeFn } from "./lifeController";

export const useLife = () => {
  const useLife = useRef(100);
  const useLifeBar = useRef<HTMLElement | null>(null);

  // Função para atualizar a barra de vida
  const updateBar = () => {
    if (useLifeBar.current) {
      useLifeBar.current.style.width = `${useLife.current}%`;
    }
  };

  // Esta function manipula a vida do player.
  const modifyLife = (amount: number) => {
    useLife.current = Math.max(0, Math.min(100, useLife.current + amount));
    updateBar();
    console.log(`🩸 Vida atual: ${useLife.current}, modificando em: ${amount}`);

    if (useLife.current <= 0) {
      console.log("Game Over - no life!");
    }
  };

  useEffect(() => {
    useLifeBar.current = document.getElementById("life-bar");
    setRemoveLifeFn(modifyLife);
    console.log("✅ removeLifeFn foi definido");
  }, []);

  return {
    getLife: () => useLife.current,
    addLife: (amount: number) => modifyLife(Math.abs(amount)),
  };
};
