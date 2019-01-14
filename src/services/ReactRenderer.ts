import { injectable } from 'inversify';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

@injectable()
export class ReactRenderer {
  public async render(component: any, data: any): Promise<string> {
    return renderToStaticMarkup(React.createElement(component, data));
  }
}
