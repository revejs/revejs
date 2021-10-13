import { Effect, onUpdate } from "./types";
import { stillUpdatingReceivers } from "./stillUpdatingReceivers";

export function createEffect(fn: onUpdate) {
  const receiver: Effect = {
    getUpdate() {
      receiver.waitAs.forEach(waitingGroups => {
        waitingGroups.delete(receiver);
      })
      receiver.waitAs.clear();
      stillUpdatingReceivers.push(receiver);
      try {
        fn();
      } finally {
        stillUpdatingReceivers.pop();
      }
    },
    waitAs: new Set(),
  };

  receiver.getUpdate();
}