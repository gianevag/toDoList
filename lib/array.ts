import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = <T>(array: T[], index: number, item: T) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = <T>(
  array: T[],
  oldIndex: number,
  newIndex: number,
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

export const moveBetweenContainers = <
  T extends Record<C, U[]>,
  C extends keyof T,
  U,
>(
  groupOfItem: T,
  activeContainer: C,
  activeIndex: number,
  overContainer: C,
  overIndex: number,
  item: U,
): T => {
  return {
    ...groupOfItem,
    [activeContainer]: removeAtIndex(groupOfItem[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(groupOfItem[overContainer], overIndex, item),
  };
};
