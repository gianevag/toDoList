"use client";

import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { List } from "../List/List";
import { SortableItem } from "../SortableItem/SortableItem";
import { Task } from "../Task/Task";

export default function Droppable({
  id,
  items,
  title,
}: {
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  title: string;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id as string}
      items={items}
      strategy={rectSortingStrategy}
    >
      <List ref={items.length === 0 ? setNodeRef : null} listTitle={title}>
        {items.map((item) => (
          <SortableItem key={item} id={item}>
            <Task title={item as string} />
          </SortableItem>
        ))}
      </List>
    </SortableContext>
  );
}
