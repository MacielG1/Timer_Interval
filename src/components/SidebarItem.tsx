import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useStore from "../store/useStore";
import { inputSettings as lang } from "../utils/lang";
import type { savedWorkoutType } from "../store/slices/localStorage";
import { Icons } from "../assets/Icons";
import { useShallow } from "zustand/shallow";

export default function SidebarItem({ item }: { item: savedWorkoutType }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [savedWorkouts, setSavedWorkouts] = useStore(useShallow((state) => [state.savedWorkouts, state.setSavedWorkouts]));
  const [SetIsLoadingSavedTimer, preferredLanguage] = useStore(useShallow((state) => [state.SetIsLoadingSavedTimer, state.preferredLanguage]));
  const [removeBorders, enableBackgroundColors] = useStore(useShallow((state) => [state.removeUIBorders, state.enableBackgroundColors]));

  function handleDelete(id: string) {
    let timers = savedWorkouts.filter((i) => i.id !== id);
    setSavedWorkouts(timers);
    localStorage.setItem("savedTimer", JSON.stringify(timers));
  }

  function handleLoad(id: string) {
    let timer = savedWorkouts.find((i) => i.id === id);

    if (!timer) return;
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
    localStorage.setItem("latestTimer", JSON.stringify(timer));

    // adds an effect to the inputs when the button is clicked
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
      className={`relative mb-4 rounded-lg border border-gray-500 bg-neutral-900 px-12 py-2 focus-visible:outline-none sm:px-6 md:px-4 md:py-3 2xl:px-6 ${
        isDragging ? "cursor-grab" : "cursor-pointer"
      }`}
      style={{
        ...style,
        borderColor: enableBackgroundColors && removeBorders ? "transparent" : "",
      }}
      tabIndex={-1}
    >
      <div className="absolute right-0 top-0 p-2 px-3">
        <button onClick={() => handleDelete(item.id)} className="focus:scale-110 focus-visible:outline-none">
          <Icons.closeIcon className="w-5" />
        </button>
      </div>
      <div className="flex justify-center text-2xl">
        <span>{item.Title}</span>
      </div>
      <div className="grid grid-cols-1 justify-center gap-2 px-0 py-2 text-left text-sm sm:grid-cols-2 sm:gap-5 sm:gap-y-1 sm:py-4 2xl:text-base">
        <span className="order-1 text-center sm:order-none sm:pl-5 sm:text-left">
          {lang.rounds[preferredLanguage]} {item.Rounds}
        </span>

        <div className="order-2 flex items-center gap-2 sm:order-none">
          <span className={`inline-block h-3 w-3 rounded-full`} style={{ backgroundColor: item.WorkColor }}></span>
          <span>
            {lang.work[preferredLanguage]} {`${item.WorkMinutes}:${item.WorkSeconds}`}
          </span>
        </div>
        <div className="order-4 flex items-center gap-2 sm:order-none">
          <span className={`inline-block h-3 w-3 rounded-full`} style={{ backgroundColor: item.PrepColor }}></span>
          <span>
            {lang.prepare[preferredLanguage]} {`${item.PrepareMinutes}:${item.PrepareSeconds}`}
          </span>
        </div>

        <div className="order-3 flex items-center gap-2 sm:order-none">
          <span className={`inline-block h-3 w-3 rounded-full`} style={{ backgroundColor: item.RestColor }}></span>
          <span>
            {lang.rest[preferredLanguage]} {`${item.RestMinutes}:${item.RestSeconds}`}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleLoad(item.id)}
          className="rounded-lg bg-blue-500 px-2 py-1 font-medium text-black transition duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          Load
        </button>
      </div>
    </div>
  );
}
