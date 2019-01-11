/**
 * Check to see if a property key exists in an object.
 */
export function exists<T>(obj: T, key: keyof T): boolean;
export function exists(obj: any, key: PropertyKey): boolean;
export function exists(obj: any, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Check to see if some property key exists in an object.
 */
export function someExists<T>(obj: T, keys: Array<keyof T>): boolean;
export function someExists(obj: any, keys: PropertyKey[]): boolean;
export function someExists(obj: any, keys: PropertyKey[]): boolean {
  return keys.some((key) => exists(obj, key));
}

/**
 * Check to see if every key exists in an object.
 */
export function everyExists<T>(obj: T, keys: Array<keyof T>): boolean;
export function everyExists(obj: any, keys: PropertyKey[]): boolean;
export function everyExists(obj: any, keys: PropertyKey[]): boolean {
  return keys.every((key) => exists(obj, key));
}

/**
 * Get a key from an object with an optional default.
 */
export function get<T, K extends keyof T, D>(obj: T, key: K, def: D): T[K]|D;
export function get<T, K extends keyof T, D>(obj: T, key: K): T[K]|undefined;
export function get<D>(obj: any, key: PropertyKey, def?: D): any;
export function get<D>(obj: any, key: PropertyKey, def?: D): any {
  return exists(obj, key) ? obj[key] : def;
}

/**
 * Get the environment value from the key.
 */
export function env<D>(key: string, defaultValue: D): string|D;
export function env<D>(key: string): string|undefined;
export function env<D>(key: string, defaultValue?: D): string|D|undefined {
  const val = process.env[key];

  if (val === undefined) {
    return defaultValue;
  }

  return val;
}

/**
 * Check to see if an environment key exists.
 */
export function envExists(key: string): boolean {
  return exists(process.env, key);
}
