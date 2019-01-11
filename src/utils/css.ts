import { BaseObject } from '../types';

/**
 * Class names helper, with inspiration from the `classnames` package.
 */
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
