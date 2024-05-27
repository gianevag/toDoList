"use client";

import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { List } from "../List/List";
import { SortableItem } from "../SortableItem/SortableItem";
import { Task } from "../Task/Task";
import { Task as TTask } from "definitions";

export default function Droppable({
  id,
  items,
  title,
  data,
}: {
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  title: string;
  data: TTask[];
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id as string}
      items={items}
      strategy={rectSortingStrategy}
    >
      <List ref={items.length === 0 ? setNodeRef : null} listTitle={title}>
        {items.map((item) => {
          const taskData = data.find((i) => i.id === item);

          if (!taskData) {
            return;
          }

          return (
            <SortableItem key={item} id={item}>
              <Task title={taskData.title} desciption={taskData.description} />
            </SortableItem>
          );
        })}
      </List>
    </SortableContext>
  );
}
