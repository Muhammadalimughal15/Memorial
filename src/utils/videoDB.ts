const DB_NAME = "profile-videos";
const STORE = "videos";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = action(db.transaction(STORE, mode).objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const saveVideo = (id: string, blob: Blob) =>
  run("readwrite", (store) => store.put(blob, id));

export const getVideo = (id: string) =>
  run<Blob | undefined>("readonly", (store) => store.get(id));

export const deleteVideo = (id: string) =>
  run("readwrite", (store) => store.delete(id));