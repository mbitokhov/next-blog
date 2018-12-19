import { BaseObject } from "../types";

export function mixins<T>(first: T, ...args: T[]): T {
  let mixed: T = Object.assign({}, first);

  for (const obj of args) {
    if (obj) {
      mixed = Object.assign(mixed, obj);
    }
  }

  return mixed;
}

export function classnames(...args: Array<BaseObject<boolean>|string|undefined>): string {
  let compiledClassName = '';

  for (const argument of args) {
    if (typeof argument === 'undefined') {
      // consider this a helper for optional values
      continue;
    }

    if (typeof argument === 'string') {
      compiledClassName += ' ' + argument;
      continue;
    }

    for (const className of Object.keys(argument)) {
      if (argument[className]) {
        compiledClassName += ' ' + className;
      }
    }
  }

  return compiledClassName.substr(1);
}
