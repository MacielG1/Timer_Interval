import InputMenu from "./InputMenu";
import TimerDisplay from "./TimerDisplay";
import Progress from "./Progress";
import SaveTimer from "./SaveTimer";
import useStore from "../store/useStore";
import MenuButtons from "./MenuButtons";

export default function TimerApp() {
  const removeBorders = useStore((state) => state.removeUIBorders);
  const mainTimerBorder = useStore((state) => state.mainTimerBorder);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  return (
    <section
      className="relative flex flex-col mx-auto px-0 xs:px-2 sm:px-4  py-4 2xl:py-12 bg-neutral-950 border border-gray-500 mt-2 sm:mt-5 text-center rounded-xl
    max-w-sm  xs:max-w-lg sm:max-w-xl lg:max-w-2xl  2xl:max-w-3xl  w-full 2xl:mt-10  "
      style={{ borderColor: enableBackgroundColors && removeBorders ? "transparent" : mainTimerBorder, borderWidth: mainTimerBorder === "#787777" ? "1px" : "3px" }}
    >
      <TimerDisplay />

      <Progress />

      <MenuButtons />

      <InputMenu />

      <SaveTimer />
    </section>
  );
}
