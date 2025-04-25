import { useEffect, useRef } from "react";

export const useOxygen = () => {
  const oxygen = useRef(100);
  const oxygenBar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    oxygenBar.current = document.getElementById("oxygen-bar");

    const interval = setInterval(() => {
      if (!oxygenBar.current) return;

      oxygen.current -= 0.5;
      if (oxygen.current <= 0) {
        oxygen.current = 0;
        clearInterval(interval);
        console.log("Game Over - Sem oxigênio");
      }

      updateBar();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateBar = () => {
    if (oxygenBar.current) {
      oxygenBar.current.style.width = `${oxygen.current}%`;
    }
  };

  const addOxygen = (amount: number) => {
    oxygen.current = Math.min(100, oxygen.current + amount);
    updateBar();
  };

  return { addOxygen, getOxygen: () => oxygen.current };
};
