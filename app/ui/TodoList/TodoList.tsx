"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type Active,
  type Over,
} from "@dnd-kit/core";
import Droppable from "../Droppable/Droppable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove, moveBetweenContainers } from "@/lib/array";
import { Tasks, Containers, Task } from "definitions";
import { Task as TaskComponent } from "../Task/Task";
import { task_to_title } from "@/lib/constants";

export default function TodoList({ tasks }: { tasks: Tasks }) {
  const [items, setItems] = useState<Tasks>(tasks); // state of sortable items that use in dndkit lib, the identifiers should be a strings or number
  const [active, setActive] = useState<Task | null>(null); // state of active item when user start to drag an item

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart({ active }: { active: Active }) {
    const activeContainer: Containers =
      active.data.current?.sortable.containerId;

    const task = items[activeContainer].find((i) => i.id === active.id);

    if (!task) return null;

    setActive(task);
  }

  const handleDragCancel = () => setActive(null);
  const handleDragOver = ({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer: Containers =
      active.data.current?.sortable.containerId;
    const overContainer: Containers =
      over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItems((item) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          overId in item
            ? items[overContainer].length + 1
            : over.data.current?.sortable.index;

        const task = items[activeContainer].find((i) => i.id === active.id);

        if (!task) return item;

        return moveBetweenContainers<Tasks, Containers, Task>(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          task,
        );
      });
    }
  };
  function handleDragEnd({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) {
    if (!over) {
      setActive(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer: Containers =
        active.data.current?.sortable.containerId;
      const overContainer: Containers =
        over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in items
          ? items[overContainer].length + 1
          : over.data.current?.sortable.index;

      setItems((items) => {
        let newItems = { ...items };
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex,
            ),
          };
        }
        return newItems;
      });
    }
    setActive(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex m-auto max-w-[1100px]">
        {Object.keys(items).map((item) => (
          <Droppable
            key={item}
            id={item}
            title={task_to_title[item as Containers]}
            items={items[item as Containers].map((i) => i.id)}
            data={items[item as Containers]}
          />
        ))}
      </div>
      <DragOverlay>
        {active ? (
          <TaskComponent title={active.title} desciption={active.description} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
