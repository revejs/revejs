import { Parcel } from "./types";
import { createDelivery } from "./createDelivery";
import { createReceiver } from "./createReceiver";

export const createDeepDelivery = <T>(fn: Parcel<T>) => {
  const [old, setOld] = createDelivery<T>(fn());
  createReceiver(() => {
    const newValue = fn()
    if (old() != newValue) setOld(newValue)
  })

  return old;
}