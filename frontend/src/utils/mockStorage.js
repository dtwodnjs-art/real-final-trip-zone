export function readMockRows(key, seedRows) {
  if (typeof window === "undefined") return seedRows;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : seedRows;
  } catch {
    return seedRows;
  }
}

export function writeMockRows(key, rows) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(rows));
}
