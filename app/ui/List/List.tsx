"use client";

import React from "react";

type ListProps = React.ComponentPropsWithoutRef<"ul"> & {
  children: React.ReactNode;
  listTitle?: String;
};

const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  return (
    <div className="container min-w-[250px]">
      {props.listTitle && (
        <h3 className="p-2 text-xl text-center font-semibold">
          {props.listTitle}
        </h3>
      )}
      <ul className={"flex flex-col gap-[10px]"} ref={ref}>
        {props.children}
      </ul>
    </div>
  );
});

List.displayName = "List";
export { List };
