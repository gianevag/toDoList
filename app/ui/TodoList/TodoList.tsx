"use client";

import { useEffect, useState } from "react";
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
import Droppable from "@/app/ui/Droppable/Droppable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { moveBetweenContainers } from "@/lib/array";
import { Tasks, Containers, Task } from "definitions";
import { Task as TaskComponent } from "@/app/ui/Task/Task";
import { task_to_title } from "@/lib/constants";
import { arrayMove } from "@dnd-kit/sortable";
import { reorderTasks } from "@/data/tasks";
import { debounce } from "@/lib/debounce";
import { DeleteTaskButton } from "@/app/ui/Task/Buttons/DeleteTask";
import { UpdateTaskButton } from "@/app/ui/Task/Buttons/UpdateTask";

let orderContainers: Containers[] = ["todo", "doing", "done"];

// proccessedTasks function is used to order the tasks in the containers
const proccessedTasks = (tasks: Tasks) => {
  return orderContainers.reduce((acc, container) => {
    acc[container] = tasks[container] || [];
    return acc;
  }, {} as Tasks);
};

export default function TodoList({ tasks }: { tasks: Tasks }) {
  const ptasks = proccessedTasks(tasks);

  const [items, setItems] = useState<Tasks>(ptasks); // state of sortable items that use in dndkit lib, the identifiers should be a strings or number
  const [active, setActive] = useState<Task | null>(null); // state of active item when user start to drag an item

  // useEffect to update the items state when the tasks prop is changed from API
  useEffect(() => {
    setItems(ptasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ptasks)]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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

        const newItems = moveBetweenContainers<Tasks, Containers, Task>(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          task
        );

        return newItems;
      });
    }
  };
  async function handleDragEnd({
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

    if (
      active.id !== over.id ||
      over.data.current?.sortable.items.length === 1
    ) {
      const activeContainer: Containers =
        active.data.current?.sortable.containerId;
      const overContainer: Containers =
        over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in items
          ? items[overContainer].length + 1
          : over.data.current?.sortable.index;

      let newItems = { ...items };

      if (activeContainer === overContainer) {
        newItems = {
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        };
      }

      setItems(newItems);
      // prevent multiple calls
      debounce(() => reorderTasks(newItems))();
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
      <div className="flex">
        {orderContainers.map((item) => (
          <Droppable
            key={item}
            id={item}
            title={task_to_title[item]}
            items={items[item].map((i) => i.id)}
            data={items[item]}
          />
        ))}
      </div>
      <DragOverlay>
        {active ? (
          <div className="flex flex-row">
            <TaskComponent
              title={active.title}
              desciption={active.description}
            />
            <div className="flex flex-row pt-1 relative right-[70px]">
              <UpdateTaskButton id={active.id} />
              <DeleteTaskButton id={active.id} />
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
