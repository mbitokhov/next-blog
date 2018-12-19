export function exists<T>(obj: T, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function someExists<T>(obj: T, keys: Array<keyof T>): boolean {
  return keys.some((key) => exists(obj, key));
}

export function everyExists<T>(obj: T, keys: Array<keyof T>): boolean {
  return keys.every((key) => exists(obj, key));
}
