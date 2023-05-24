import useStore from "../store/useStore";

let items = [{ id: 1, title: "Timer 1", rounds: 1, work: "00:00", workColor: "#fff", rest: "00:00", restColor: "#fff", prepare: "00:00", prepareColor: "#fff" }];

let closeButton = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect x="1" y="1" width="22" height="22" rx="10" ry="10" fill="none" stroke="#b52435" strokeWidth="2" />
    <line x1="7" y1="7" x2="17" y2="17" stroke="#b52435" strokeWidth="2" />
    <line x1="7" y1="17" x2="17" y2="7" stroke="#b52435" strokeWidth="2" />
  </svg>
);

export default function Sidebar() {
  const removeBorders = useStore((state) => state.removeUIBorders);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  const savedWorkouts = useStore((state) => state.savedWorkouts);
  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  const setIsLoadSavedTimer = useStore((state) => state.setIsLoadSavedTimer);

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
    });

    // adds a visual effect when the button when clicked
    setIsLoadSavedTimer(true);
    setTimeout(() => {
      setIsLoadSavedTimer(false);
    }, 400);
  }

  return (
    <aside className="flex justify-center min-[1360px]:absolute mt-5 xl:mt-4 2xl:mt-9 2xl:pl-1  max-h-[95%] ">
      <section className="px-2  py-1 2xl-px-4 flex flex-col gap-6  overflow-x-hidden overflow-y-auto">
        {savedWorkouts.map((i, index) => (
          <div
            className="relative bg-neutral-900 px-16 sm:px-4 2xl:px-10 py-2  2xl:py-4 rounded-lg  border border-gray-500  text-base xl:text-sm 2xl:text-base"
            key={i.id}
            style={{ borderColor: enableBackgroundColors && removeBorders ? "transparent" : "" }}
          >
            <div className="p-2 px-3 absolute top-0 right-0">
              <button onClick={() => handleDelete(i.id)}>{closeButton}</button>
            </div>
            <div className="flex text-2xl justify-center  ">
              <span>{i.Title || `Timer ${index}`}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 py-2 sm:py-4 px-1 justify-center">
              <span>Rounds {i.Rounds}</span>
              <div>
                <span>Work {`${i.WorkMinutes}:${i.WorkSeconds}`}</span>
                <span className={`mt-1 mr-2 ml-2 rounded-full w-3 h-3 inline-block `} style={{ backgroundColor: i.WorkColor }}></span>
              </div>
              <span>Prepare {`${i.PrepareMinutes}:${i.PrepareSeconds}`}</span>
              <div>
                <span>Rest {`${i.RestMinutes}:${i.RestSeconds}`}</span>
                <span className={`mt-1 mr-2 ml-2 rounded-full w-3 h-3 inline-block`} style={{ backgroundColor: i.RestColor }}></span>
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={() => handleLoad(i.id)} className="bg-blue-700  text-black  rounded-lg px-2 py-1 hover:bg-blue-800 transition duration-200">
                Load
              </button>
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}
