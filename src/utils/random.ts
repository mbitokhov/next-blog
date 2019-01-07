export function randint(start?: number, end?: number): number {
  if (arguments.length === 0 || start === undefined) {
    return randint(0, Number.MAX_SAFE_INTEGER);
  }

  if (arguments.length === 1 || end === undefined) {
    return randint(0, start);
  }

  return Math.floor(Math.random() * (end - start) + start);
}

export function randfloat(start?: number, end?: number): number {
  if (arguments.length === 0 || start === undefined) {
    return randfloat(0, Number.MAX_VALUE);
  }

  if (arguments.length === 1 || end === undefined) {
    return randfloat(0, start);
  }

  return Math.random() * (end - start) + start;
} 