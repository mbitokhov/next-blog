import { inject, injectable } from 'inversify';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { DocumentProps, DocumentPropsHook, Page, PageHooks } from '../types';
import { Paths } from '../utils/Paths';
import Document from '../view/Document';

function getDocumentProps<T>(hooks?: PageHooks<T>): DocumentPropsHook<T>|undefined {
  if (hooks && hooks.documentProps) {
    return hooks.documentProps;
  }
}

@injectable()
export class Renderer {
  constructor(
    @inject(Paths) protected paths: Paths,
  ) {
  }

  public async renderReactFile(file: string, data: any): Promise<string> {
    const component = require(this.paths.build('server', `${file}.js`));

    if (!component.default) {
      throw new Error('Invalid component');
    }

    return this.react(component, data);
  }

  public async react<P>(file: Page<P>, data: P): Promise<string> {
    const documentPropHooks = getDocumentProps(file.hooks);

    const rendered = renderToString(React.createElement(file.default, data));
    const props: DocumentProps = documentPropHooks ? documentPropHooks(data) : {};

    return '<!DOCTYPE html>' + renderToStaticMarkup(React.createElement(Document, {
      ...props,
      original: props.original || data,
      children: rendered,
    }));
  }
}
