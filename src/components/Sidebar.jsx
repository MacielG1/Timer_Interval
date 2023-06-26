import useStore from "../store/useStore";
import CloseIcon from "../assets/icons/CloseIcon.svg";
import { lang } from "../utils/lang";

export default function Sidebar() {
  const removeBorders = useStore((state) => state.removeUIBorders);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  const savedWorkouts = useStore((state) => state.savedWorkouts);
  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  const SetIsLoadingSavedTimer = useStore((state) => state.SetIsLoadingSavedTimer);
  const preferredLanguage = useStore((state) => state.preferredLanguage);

  function handleDelete(id) {
    let timers = savedWorkouts.filter((i) => i.id !== id);
    setSavedWorkouts(timers);
    localStorage.setItem("savedTimer", JSON.stringify(timers));
  }

  function handleLoad(id) {
    let timer = savedWorkouts.find((i) => i.id === id);

    useStore.setState({
      Rounds: timer.Rounds,
      WorkMinutes: timer.WorkMinutes,
      WorkSeconds: timer.WorkSeconds,
      WorkColor: timer.WorkColor,
      RestMinutes: timer.RestMinutes,
      RestSeconds: timer.RestSeconds,
      RestColor: timer.RestColor,
      PrepareMinutes: timer.PrepareMinutes,
      PrepareSeconds: timer.PrepareSeconds,
      PrepColor: timer.PrepColor,
    });

    // adds an effect to the inputs when the btn is clicked
    SetIsLoadingSavedTimer(true);
    setTimeout(() => {
      SetIsLoadingSavedTimer(false);
    }, 400);
  }

  return (
    <aside className="flex justify-center min-[1360px]:absolute mt-5 xl:mt-4 2xl:mt-9 2xl:pl-1  max-h-[95%] ">
      <section className="2xl:px-2 py-1 2xl-px-4 flex flex-col gap-6  overflow-x-hidden overflow-y-auto">
        {savedWorkouts.map((i, index) => (
          <div
            className="relative bg-neutral-900 px-16 sm:px-6 md:px-6  2xl:px-10 py-2  2xl:py-4 rounded-lg  border border-gray-500  text-base xl:text-sm 2xl:text-base"
            key={i.id}
            style={{ borderColor: enableBackgroundColors && removeBorders ? "transparent" : "" }}
          >
            <div className="p-2 px-3 absolute top-0 right-0">
              <button onClick={() => handleDelete(i.id)}>
                <img src={CloseIcon} alt="close" className="w-6" width="24" height="24" />
              </button>
            </div>
            <div className="flex text-2xl justify-center">
              <span>{i.Title || `Timer ${index}`}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:  sm:gap-y-2 py-2 sm:py-4 px-0 justify-center text-left text-md sm:text-lg min-[1360px]:text-sm min-[1620px]:text-base">
              <span className="text-center sm:text-left order-1 sm:order-none  ">
                {lang.rounds[preferredLanguage]} {i.Rounds}
              </span>

              <div className="order-2  sm:order-none flex  gap-2 items-center">
                <span className={`rounded-full w-3 h-3 inline-block `} style={{ backgroundColor: i.WorkColor }}></span>
                <span>
                  {lang.work[preferredLanguage]} {`${i.WorkMinutes}:${i.WorkSeconds}`}
                </span>
              </div>
              <div className="order-4 sm:order-none flex gap-2 items-center">
                <span className={` rounded-full w-3 h-3 inline-block  `} style={{ backgroundColor: i.PrepColor }}></span>
                <span>
                  {lang.prepare[preferredLanguage]} {`${i.PrepareMinutes}:${i.PrepareSeconds}`}
                </span>
              </div>

              <div className="order-3 sm:order-none flex gap-2 items-center">
                <span className={`rounded-full w-3 h-3 inline-block`} style={{ backgroundColor: i.RestColor }}></span>
                <span>
                  {lang.rest[preferredLanguage]} {`${i.RestMinutes}:${i.RestSeconds}`}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleLoad(i.id)}
                className="bg-blue-500  text-black font-medium rounded-lg px-2 py-1 hover:bg-blue-600 transition duration-200"
              >
                Load
              </button>
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}
