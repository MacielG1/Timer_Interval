import MainMenu from "./MainMenu";
import TimerDisplay from "./TimerDisplay";
import Progress from "./Progress";
import SaveTimer from "./SaveTimer";
import useStore from "../store/useStore";
import MenuButtons from "./MenuButtons";
import { useState, useEffect } from "react";

export default function TimerApp() {
  const [removeBorders, mainTimerBorder] = useStore((state) => [state.removeUIBorders, state.mainTimerBorder]);
  const [enableBackgroundColors, savedWorkouts] = useStore((state) => [state.enableBackgroundColors, state.savedWorkouts]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 600px)").matches);
  const setPreferredSound = useStore((state) => state.setPreferredSound);

  function handleMediaQueryChange(mediaQuery: MediaQueryListEvent) {
    if (mediaQuery.matches) setIsSmallScreen(true);
    else setIsSmallScreen(false);
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia("max-width: 600px");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    if (mediaQuery.matches) setIsSmallScreen(true);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const audioType = localStorage.getItem("audioType");
    if (audioType === "audio1") setPreferredSound("audio1");
    else if (audioType === "audio2") setPreferredSound("audio2");
  }, []);

  return (
    <section
      className="relative mx-auto mt-3 flex w-full max-w-sm flex-col rounded-xl border border-gray-500 bg-neutral-950 px-0 py-2 text-center xs:max-w-lg xs:px-2 sm:mt-5 sm:max-w-xl sm:px-4 lg:max-w-[41rem] 2xl:mt-10 2xl:max-w-3xl 2xl:pt-12"
      style={{
        borderColor: enableBackgroundColors && removeBorders ? "transparent" : mainTimerBorder,
        borderWidth: mainTimerBorder === "#787777" ? "3px" : "3px",
        transition: "all 0.38s ease-in-out",
        transform: isSmallScreen ? (savedWorkouts.length > 0 ? "translateY(0)" : "translateY(2.5rem)") : "translateY(0)",
      }}
    >
      <TimerDisplay />
      <Progress />
      <MenuButtons />
      <MainMenu />
      <SaveTimer />
    </section>
  );
}
