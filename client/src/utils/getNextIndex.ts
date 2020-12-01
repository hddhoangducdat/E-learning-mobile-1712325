export const getNextIndex = (index: number, length: number) => {
  const nextIndex = index + 1;
  if (nextIndex < length) {
    return nextIndex;
  }
  return 0;
};
