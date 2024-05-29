export const removeAtIndex = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = <T>(array: T[], index: number, item: T) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
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

export const groupBy = <R extends { [key: string]: T[] } ,T extends Record<K, any>, K extends keyof T>(
  array: T[],
  key: K
): R => {
  return array.reduce((acc: R, item: T) => {
    const groupKey = item[key];

    if (!acc[groupKey]) {
      acc[groupKey] = [] as any; //
    }
    
    (acc[groupKey] as any).push(item); // Push the rest of the properties without the grouping key

    return acc;
  }, {} as any);
}