import { useEffect, useRef } from "react";

type PlaySound = (whichSound: string) => void;

export const useAudio = (sound1Url: string, sound2Url: string): PlaySound => {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio1Ref.current = new Audio(sound1Url);
    audio2Ref.current = new Audio(sound2Url);
    audio1Ref.current.preload = "auto";
    audio2Ref.current.preload = "auto";

    // Cleanup on unmount
    return () => {
      audio1Ref.current?.pause();
      audio2Ref.current?.pause();
      audio1Ref.current = null;
      audio2Ref.current = null;
    };
  }, [sound1Url, sound2Url]);

  const playSound: PlaySound = (whichSound) => {
    if (whichSound === sound1Url && audio1Ref.current) {
      audio1Ref.current.currentTime = 0;
      audio1Ref.current.play();
    } else if (whichSound === sound2Url && audio2Ref.current) {
      audio2Ref.current.currentTime = 0;
      audio2Ref.current.play();
    }
  };

  return playSound;
};
