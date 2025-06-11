import { useEffect, useRef } from "react";

type PlaySound = (whichSound: string) => void;

export const useAudio = (sound1Url: string, sound2Url: string, sound3Url?: string, sound4Url?: string, sound5Url?: string): PlaySound => {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const audio3Ref = useRef<HTMLAudioElement | null>(null);
  const audio4Ref = useRef<HTMLAudioElement | null>(null);
  const audio5Ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audio1Ref.current = new Audio(sound1Url);
    audio2Ref.current = new Audio(sound2Url);
    audio3Ref.current = new Audio(sound3Url);
    audio4Ref.current = new Audio(sound4Url);
    audio5Ref.current = new Audio(sound5Url);
    audio1Ref.current.preload = "auto";
    audio2Ref.current.preload = "auto";
    audio3Ref.current.preload = "auto";
    audio4Ref.current.preload = "auto";
    audio5Ref.current.preload = "auto";
    // Cleanup on unmount
    return () => {
      audio1Ref.current?.pause();
      audio2Ref.current?.pause();
      audio3Ref.current?.pause();
      audio4Ref.current?.pause();
      audio5Ref.current?.pause();
      audio1Ref.current = null;
      audio2Ref.current = null;
      audio3Ref.current = null;
      audio4Ref.current = null;
      audio5Ref.current = null;
    };
  }, [sound1Url, sound2Url, sound3Url, sound4Url, sound5Url]);

  const playSound: PlaySound = (whichSound) => {
    if (whichSound === sound1Url && audio1Ref.current) {
      audio1Ref.current.currentTime = 0;
      audio1Ref.current.play();
    } else if (whichSound === sound2Url && audio2Ref.current) {
      audio2Ref.current.currentTime = 0;
      audio2Ref.current.play();
    }
    if (sound3Url && whichSound === sound3Url && audio3Ref.current) {
      audio3Ref.current.currentTime = 0;
      audio3Ref.current.play();
    }
    if (sound4Url && whichSound === sound4Url && audio4Ref.current) {
      audio4Ref.current.currentTime = 0;
      audio4Ref.current.play();
    }
    if (sound5Url && whichSound === sound5Url && audio5Ref.current) {
      audio5Ref.current.currentTime = 0;
      audio5Ref.current.play();
    }
  };

  return playSound;
};
