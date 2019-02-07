import React from 'react';
import ReactDOM from 'react-dom';
import { HydratePropsHook, Page, PageHooks } from '../types';

function assertNotNull<T>(obj: T|null): T {
  if (obj === null) {
    throw new Error('Object cannot be null');
  }

  return obj;
}

function getHydrateProps<T>(hooks: PageHooks<T>|undefined): HydratePropsHook<T>|undefined {
  if (hooks && hooks.hydrateProps) {
    return hooks.hydrateProps;
  }
}

function loadPage(page: Page<any>) {
  const root = assertNotNull(document.querySelector('[data-reactroot]'));
  const parent = assertNotNull(root.parentNode) as Element;

  const hydrateProps = getHydrateProps(page.hooks);

  let props = JSON.parse((parent as any).dataset.props);
  props = hydrateProps ? hydrateProps(props) : props;

  ReactDOM.hydrate(React.createElement(page.default, props), parent);
}

(window as any)._pages = (window as any)._pages || [];
(window as any)._pages.map((page: Page<any>) => loadPage(page));
(window as any)._pages.push = loadPage;
