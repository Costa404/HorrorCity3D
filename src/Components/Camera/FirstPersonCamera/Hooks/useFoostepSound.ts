import { useEffect, useRef } from "react";

export const useFootstepSound = (isMoving: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current && isMoving) {
      audioRef.current = new Audio("/src/assets/Sounds/footstep.wav");

      audioRef.current.oncanplaythrough = () => {
        console.log("Áudio carregado com sucesso!");
      };

      audioRef.current.onerror = (err) => {
        console.error("Erro ao carregar o áudio:", err);
      };

      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }

    const sound = audioRef.current;
    if (!sound) return;

    const handlePlay = async () => {
      try {
        console.log("Tentando reproduzir o áudio...");
        await sound.play();
        console.log("Áudio reproduzido com sucesso!");
      } catch (err) {
        console.warn("Falha ao tentar reproduzir o áudio:", err);
      }
    };

    if (isMoving) {
      if (sound.paused) {
        handlePlay();
      }
    } else {
      console.log("Pausando o áudio...");
      sound.pause();
      sound.currentTime = 0;
    }

    return () => {
      console.log(
        "Component desmontado ou estado alterado, pausando o áudio..."
      );
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    };
  }, [isMoving]);
};
