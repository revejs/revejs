import { Accessor } from "./types";
import { createSignal } from "./createSignal";
import { createEffect } from "./createEffect";

export const createMemo = <T>(fn: () => T, deps: Accessor[] = []) => {
  const [val, set] = createSignal<T | undefined>(undefined);
  if (deps.length) createEffect(() => set(fn()), deps)();
  else createEffect(() => set(fn()));
  return val as Accessor<T>;
}