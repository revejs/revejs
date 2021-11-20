import { Accessor } from "../types";
import { createSignal } from "../createSignal";
import { createEffect } from "../createEffect";

export function createCarefulMemo<T>(fn: () => T, deps?: Accessor[]) {
  const [val, set] = createSignal<T | undefined>(undefined);
  createEffect(() => {
    const newValue = fn();
    if (newValue != val()) {
      set(fn())
    }
  }, deps)();
  return val as Accessor<T>;
}