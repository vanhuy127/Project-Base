export function getLocalStorage(key: string) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) return JSON.parse(storedValue);

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
