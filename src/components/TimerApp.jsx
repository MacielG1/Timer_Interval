import InputMenu from "./InputMenu";
import TimerDisplay from "./TimerDisplay";
import Progress from "./Progress";
import SaveTimer from "./SaveTimer";
import useStore from "../store/useStore";
import MenuButtons from "./MenuButtons";
import { useState, useEffect } from "react";
export default function TimerApp() {
  const removeBorders = useStore((state) => state.removeUIBorders);
  const mainTimerBorder = useStore((state) => state.mainTimerBorder);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);
  const savedWorkouts = useStore((state) => state.savedWorkouts);
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 600px)").matches);

  function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } // cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col mx-auto px-0 xs:px-2 sm:px-4 py-2 2xl:py-12 bg-neutral-950 border border-gray-500 mt-3 sm:mt-5 text-center rounded-xl
    max-w-sm  xs:max-w-lg sm:max-w-xl lg:max-w-[41rem]  2xl:max-w-3xl w-full 2xl:mt-10  "
      style={{
        borderColor: enableBackgroundColors && removeBorders ? "transparent" : mainTimerBorder,
        borderWidth: mainTimerBorder === "#787777" ? "1px" : "3px",
        transition: "all 0.38s ease-in-out",
        transform: isSmallScreen ? (savedWorkouts.length > 0 ? "translateY(0)" : "translateY(2.5rem)") : null,
      }}
    >
      <TimerDisplay />

      <Progress />

      <MenuButtons />

      <InputMenu />

      <SaveTimer />
    </section>
  );
}
