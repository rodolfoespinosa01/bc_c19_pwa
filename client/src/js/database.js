import { openDB } from "idb";

const initdb = async () =>
  openDB("jateDB", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate_store")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate_store", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await openDB("jateDB", 1);
  const tx = db.transaction("jate_store", "readwrite");
  const store = tx.objectStore("jate_store");
  const result = await store.put({ id: 1, value: content });
  console.log("Content has been added to the database", result.value);
};

export const getDb = async () => {
  const db = await openDB("jateDB", 1);
  const tx = db.transaction("jate_store", "readonly");
  const store = tx.objectStore("jate_store");
  const text = await store.get(1);
  await tx.done;
  console.log("Content has been sent from database", text);
  return text?.value;
};

initdb();
