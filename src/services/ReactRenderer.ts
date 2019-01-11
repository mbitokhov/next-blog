import { injectable } from 'inversify';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

@injectable()
export class ReactRenderer {
  public render(component: any, data: any) {
    return renderToStaticMarkup(React.createElement(component, data));
  }
}
