import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useStore from "../store/useStore";
import CloseIcon from "../assets/icons/CloseIcon.svg";
import { inputSettings as lang } from "../utils/lang";

export default function SidebarItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const savedWorkouts = useStore((state) => state.savedWorkouts);
  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);
  const SetIsLoadingSavedTimer = useStore((state) => state.SetIsLoadingSavedTimer);
  const preferredLanguage = useStore((state) => state.preferredLanguage);
  const removeBorders = useStore((state) => state.removeUIBorders);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  function handleDelete(id) {
    let timers = savedWorkouts.filter((i) => i.id !== id);
    setSavedWorkouts(timers);
    localStorage.setItem("savedTimer", JSON.stringify(timers));
  }

  function handleLoad(id) {
    let timer = savedWorkouts.find((i) => i.id === id);

    console.log(timer);
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
    }, 300);
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="relative bg-neutral-900 px-16 sm:px-6 md:px-6 2xl:px-10 py-2 mb-4 2xl:py-4 rounded-lg border border-gray-500 text-base xl:text-sm 2xl:text-base focus-visible:outline-none"
      style={{ ...style, borderColor: enableBackgroundColors && removeBorders ? "transparent" : "" }}
      tabIndex={-1}
    >
      <div className="p-2 px-3 absolute top-0 right-0">
        <button onClick={() => handleDelete(item.id)} className="focus-visible:outline-none focus:scale-110">
          <img src={CloseIcon} alt="close" className="w-6" width="24" height="24" />
        </button>
      </div>
      <div className="flex text-2xl justify-center">
        <span>{item.Title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3   sm:gap-y-2 lg:gap-x-6 py-2 sm:py-4 px-0 justify-center text-left text-md sm:text-lg min-[1360px]:text-sm min-[1620px]:text-base">
        <span className="sm:pl-5 text-center sm:text-left order-1 sm:order-none  ">
          {lang.rounds[preferredLanguage]} {item.Rounds}
        </span>

        <div className="order-2 sm:order-none flex  gap-2 items-center">
          <span className={`rounded-full w-3 h-3 inline-block `} style={{ backgroundColor: item.WorkColor }}></span>
          <span>
            {lang.work[preferredLanguage]} {`${item.WorkMinutes}:${item.WorkSeconds}`}
          </span>
        </div>
        <div className="order-4 sm:order-none flex gap-2 items-center">
          <span className={` rounded-full w-3 h-3 inline-block  `} style={{ backgroundColor: item.PrepColor }}></span>
          <span>
            {lang.prepare[preferredLanguage]} {`${item.PrepareMinutes}:${item.PrepareSeconds}`}
          </span>
        </div>

        <div className="order-3 sm:order-none flex gap-2 items-center">
          <span className={`rounded-full w-3 h-3 inline-block`} style={{ backgroundColor: item.RestColor }}></span>
          <span>
            {lang.rest[preferredLanguage]} {`${item.RestMinutes}:${item.RestSeconds}`}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleLoad(item.id)}
          className="bg-blue-500  text-black font-medium rounded-lg px-2 py-1 hover:bg-blue-600 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 "
        >
          Load
        </button>
      </div>
    </div>
  );
}
