import { openDB } from "idb";

export const dbPromise = openDB("thoughtbox-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("notes")) {
      db.createObjectStore("notes", { keyPath: "id" });
    }
  },
});
