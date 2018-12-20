export function exists<T>(obj: T, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function someExists<T>(obj: T, keys: Array<keyof T>): boolean {
  return keys.some((key) => exists(obj, key));
}

export function everyExists<T>(obj: T, keys: Array<keyof T>): boolean {
  return keys.every((key) => exists(obj, key));
}

export function randint(start?: number, end?: number): number {
  if (arguments.length === 0) {
    return randint(0, Number.MAX_SAFE_INTEGER);
  }

  if (arguments.length === 1) {
    return randint(0, start);
  }

  return Math.floor(Math.random() * (end - start) + start);
}

export function randfloat(start?: number, end?: number): number {
  if (arguments.length === 0) {
    return randfloat(0, Number.MAX_VALUE);
  }

  if (arguments.length === 1) {
    return randint(0, start);
  }

  return Math.random() * (end - start) + start;
} 