import CenterMenu from "./CenterMenu";
import TimerDisplay from "./TimerDisplay";
import Progress from "./Progress";
import SaveTimer from "./SaveTimer";
import useStore from "../store/useStore";

export default function TimerApp() {
  const removeBorders = useStore((state) => state.removeUIBorders);
  const mainTimerBorder = useStore((state) => state.mainTimerBorder);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  return (
    <section
      className="relative flex flex-col mx-auto px-4 sm:px-4  py-4 2xl:py-12 bg-neutral-950 border border-gray-500 mt-2 sm:mt-5 text-center rounded-xl
    max-w-sm  xs:max-w-lg sm:max-w-xl lg:max-w-2xl  2xl:max-w-3xl  w-full 2xl:mt-10  max-[330px]:border-0 "
      style={{ borderColor: enableBackgroundColors && removeBorders ? "transparent" : mainTimerBorder, borderWidth: mainTimerBorder === "#787777" ? "1px" : "3px" }}
    >
      {/* Reset Button  */}
      {/* <div className=" p-2 xs:p-4 absolute top-0 left-0">
        <button
          className="rounded-xl py-1 px-2  text-center text-sm xs:text-lg text-white bg-neutral-700 cursor-pointer hover:bg-neutral-800 transition duration-300"
          type="reset"
        >
          Reset
        </button>
      </div> */}

      <TimerDisplay />

      {/* Progress Bar and Arrows Menu  */}
      <Progress />
      {/* Control Menu and Inputs */}
      <CenterMenu />

      {/* Save Settings */}
      <SaveTimer />
    </section>
  );
}
