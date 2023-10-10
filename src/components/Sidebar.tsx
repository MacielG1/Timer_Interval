import useStore from "../store/useStore";
import { DndContext, DragEndEvent, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [savedWorkouts, setSavedWorkouts] = useStore((state) => [state.savedWorkouts, state.setSavedWorkouts]);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(pointerSensor, touchSensor);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (active.id !== over?.id) {
      const currentItems = [...savedWorkouts];

      const oldIndex = currentItems.findIndex((i) => i.id === active.id);
      const newIndex = currentItems.findIndex((i) => i.id === over?.id);

      const newArray = arrayMove(currentItems, oldIndex, newIndex);
      localStorage.setItem("savedTimer", JSON.stringify(newArray));

      setSavedWorkouts(newArray);
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <aside className="mt-5 flex justify-center xl:mt-4 min-[1360px]:fixed 2xl:mt-9 2xl:pl-1 ">
        <section className="2xl-px-4 flex flex-col gap-6 py-1 2xl:px-2">
          <div className="max-h-[95vh] pr-1 xl:overflow-y-auto 2xl:pr-2">
            <SortableContext items={savedWorkouts}>
              {savedWorkouts.map((i) => (
                <SidebarItem key={i.id} item={i} />
              ))}
            </SortableContext>
          </div>
        </section>
      </aside>
    </DndContext>
  );
}
