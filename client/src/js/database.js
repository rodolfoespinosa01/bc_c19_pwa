import { openDB } from "idb";

const initdb = async () =>
  openDB("jateDB", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jateStore")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jateStore", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await openDB("jateDB", 1);
  const dbt = db.transaction("jateStore", "readwrite");
  const store = dbt.objectStore("jateStore");
  const result = await store.put({ id: 1, value: content });
  console.log("Content has been added to the database", result.value);
};

export const getDb = async () => {
  const db = await openDB("jateDB", 1);
  const dbt = db.transaction("jateStore", "readonly");
  const store = dbt.objectStore("jateStore");
  const text = await store.get(1);
  await dbt.done;
  console.log("Content has been sent from database", text);
  return text?.value;
};

initdb();
