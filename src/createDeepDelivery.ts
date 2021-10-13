import { Accessor } from "./types";
import { createSignal } from "./createSignal";
import { createEffect } from "./createEffect";

export const createDeepDelivery = <T>(fn: Accessor<T>) => {
  const [old, setOld] = createSignal<T>(fn());
  createEffect(() => {
    const newValue = fn()
    if (old() != newValue) setOld(newValue)
  })

  return old;
}