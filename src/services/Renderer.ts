import { inject, injectable } from 'inversify';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Paths } from '../utils/Paths';

export type Components = 'markdown';

@injectable()
export class Renderer {
  constructor(
    @inject(Paths) protected paths: Paths,
  ) {}

  public async react<P>(file: Components, data: P): Promise<string> {
    const component = require(this.paths.build('server', `${file}.js`)).default;
    return '<!DOCTYPE html>' + renderToString(React.createElement(component, data));
  }
}
