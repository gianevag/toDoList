"use client";

import { useState } from "react";
import Task from "./ui/Task/Task";
import List, { ListType, SortableList, SortableListItem } from "./ui/List/List";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Droppable from "./ui/Droppable/Droppable";

const tasks = {
  todo: [
    {
      title: "test 1",
    },
    {
      title: "test 2",
    },
    {
      title: "test 3",
    },
  ],
  doing: [
    {
      title: "test4",
    },
    {
      title: "test5",
    },
  ],
  done: [
    {
      title: "test7",
    },
  ],
};

const task_to_title = {
  todo: "To Do",
  doing: "Doing",
  done: "Done",
};

export default function Home() {
  const [items, setItems] = useState(tasks);
  const [active, setActive] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart({ active }) {
    const { sortable, ...item } = active.data.current;
    setActive(item);
  }

  const handleDragCancel = () => setActive(null);

  function handleDragEnd(event) {
    const { active, over } = event;

    console.log(event);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newItem = arrayMove(items, oldIndex, newIndex).map((i, idx) => ({
          ...i,
          order: idx + 1,
        }));

        console.log("before", JSON.stringify(newItem));
        // if (active.data.current.type !== over.data.current.type) {
        //   const { sortable, ...newItem } = active.data.current;
        //   newItem.type = over.data.current.type;

        //   items.splice(oldIndex, 1);
        //   items.splice(newIndex, 0, newItem);
        //   console.log("after", JSON.stringify(items));

        //   return [...items];
        // }

        return newItem;
      });
    }
  }

  return (
    <main>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <List type={ListType.HORIZONTAL}>
          {Object.keys(items).map((item) => (
            <Droppable
              key={item}
              id={item}
              title={task_to_title[item]}
              items={items[item].map((i: { title: string }) => i.title)}
            />
          ))}
        </List>
        {/* <DragOverlay>
          {active ? <Task title={active?.title} /> : null}
        </DragOverlay> */}
      </DndContext>
    </main>
  );
}
