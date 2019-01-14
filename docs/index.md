---
title: Test Article
subtitle: This is a test Article
description: Learn everything about test articles
created: 1/13/2019
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```js
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
```