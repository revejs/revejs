import { Accessor } from "./types";
import { createSignal } from "./createSignal";
import { createEffect } from "./createEffect";

export function createMemo<T>(fn: Accessor<T>) {
  const [s, set] = createSignal<T | undefined>(undefined);
  createEffect(() => set(fn()));
  return s as Accessor<T>;
}