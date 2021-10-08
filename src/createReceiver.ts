import { Receiver, onUpdate } from "./types";
import { stillUpdatingReceivers } from "./stillUpdatingReceivers";

export function createReceiver(fn: onUpdate) {
  const receiver: Receiver = {
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