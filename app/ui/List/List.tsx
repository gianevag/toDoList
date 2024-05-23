import React from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ListItem = React.ReactNode | React.ReactNode[];

export enum ListType {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

type ListProps = React.ComponentPropsWithRef<"ul"> & {
  children: ListItem;
  type: ListType;
  listTitle?: String;
};

type SortableListProps = ListProps & {
  children: React.ReactNode[];
};

const classUl = (type: ListType) => {
  return cn("flex", "list-none", {
    "flex-col": type === ListType.VERTICAL,
    "justify-around": type === ListType.HORIZONTAL,
    "gap-[20px]": type === ListType.VERTICAL,
  });
};

export default function List({
  id,
  children,
  type,
  listTitle,
  ...props
}: ListProps) {
  let listItem: ListItem = <li>{children}</li>;

  if (Array.isArray(children)) {
    listItem = children.map((child, idx) => <li key={idx}>{child}</li>);
  }

  return (
    <div className="container">
      {listTitle && (
        <h3 className="p-2 text-xl text-center font-semibold">{listTitle}</h3>
      )}
      <ul ref={props.ref} className={classUl(type)} style={props.style}>
        {listItem}
      </ul>
    </div>
  );
}

export const SortableList = ({
  children,
  type,
  listTitle,
  ...props
}: SortableListProps) => {
  return (
    <div className="container">
      <h3 className="p-2 text-xl text-center font-semibold">{listTitle}</h3>
      <ul className={classUl(type)} style={props.style}>
        {children}
      </ul>
    </div>
  );
};

export const SortableListItem = ({
  id,
  children,
  customdata,
}: {
  id: any;
  children: React.ReactNode;
  customdata: any;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: customdata });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  );
};
