import { useState, useEffect } from "react";

// Hook para aleatorizar o estado das luzes (ligado/desligado) de maneira sincronizada
export const useRandomLightState = () => {
  const [lightsOn, setLightsOn] = useState<boolean>(true);

  // Função para alterar o estado das luzes aleatoriamente
  const randomizeLightState = () => {
    setTimeout(() => {
      setLightsOn((prevState) => !prevState); // Alterna entre ligar/desligar
      randomizeLightState(); // repete the randomization
    }, Math.random() * 30000); // Tempo aleatório entre 0 e 30 segundos
  };

  useEffect(() => {
    randomizeLightState(); // Inicia a aleatorização assim que o hook for usado
  }, []);

  return lightsOn;
};
