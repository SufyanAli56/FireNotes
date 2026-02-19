import { dbPromise } from "./db";

export const saveNotesToCache = async (notes) => {
  const db = await dbPromise;
  const tx = db.transaction("notes", "readwrite");

  for (const note of notes) {
    await tx.store.put(note);
  }

  await tx.done;
};

export const getCachedNotes = async () => {
  const db = await dbPromise;
  return await db.getAll("notes");
};
