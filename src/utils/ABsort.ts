export const ABsort = <T>(a: T, b: T) => {
  if (typeof b === 'string') {
    return b.localeCompare(a as string);
  }
  return a > b ? 1 : -1;
};
