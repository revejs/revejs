export interface StrictArray<T> {
  push(val: T): void
  stop(): void
  value: T[]
  onClean: (val: T) => void
}

export const createStrictArray = <T>(): StrictArray<T> => {
  const arr: T[] = [];
  let maxLength = Infinity;
  let replace = 0;
  let stopped = false;
  let cleanFn: (val: T) => void = () => {};

  return {
    value: arr,
    push(val: T) {
      if (stopped) {
        cleanFn(arr[replace])
        arr[replace++] = val;
        if (replace >= maxLength) replace = 0;
      } else {
        arr.push(val);
      }
    },
    stop() {
      if (!stopped) {
        maxLength = arr.length;
        stopped = true;
      }
    },
    set onClean(clean: (val: T) => void) {
      cleanFn = clean;
    }
  }
}