"use client";

import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import List, { ListType } from "../List/List";
import { SortableItem } from "../SortableItem/SortableItem";
import Task from "../Task/Task";

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
    <SortableContext items={items} strategy={rectSortingStrategy}>
      <List type={ListType.VERTICAL} ref={setNodeRef} listTitle={title}>
        {items.map((item) => (
          <SortableItem key={item} id={item}>
            <Task title={item as string} />
          </SortableItem>
        ))}
      </List>
    </SortableContext>
  );
}
