import useStore from "../store/useStore";

import { DndContext, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const savedWorkouts = useStore((state) => state.savedWorkouts);
  const setSavedWorkouts = useStore((state) => state.setSavedWorkouts);

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

  function handleDragEnd(e) {
    const { active, over } = e;
    if (active.id !== over.id) {
      const currentItems = [...savedWorkouts];

      const oldIndex = currentItems.findIndex((i) => i.id === active.id);
      const newIndex = currentItems.findIndex((i) => i.id === over.id);

      const newArray = arrayMove(currentItems, oldIndex, newIndex);
      localStorage.setItem("savedTimer", JSON.stringify(newArray));

      setSavedWorkouts(newArray);
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <aside className="flex justify-center min-[1360px]:fixed mt-5 xl:mt-4 2xl:mt-9 2xl:pl-1 max-h-[95%]  xl:overflow-y-auto pr-2 ">
        <section className="2xl:px-2 py-1 2xl-px-4 flex flex-col gap-6 ">
          <SortableContext items={savedWorkouts}>
            {savedWorkouts.map((i) => (
              <SidebarItem item={i} key={i.id} />
            ))}
          </SortableContext>
        </section>
      </aside>
    </DndContext>
  );
}
