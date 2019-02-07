export interface BaseObject<T> {
  [key: string]: T;
}

export interface AnyObject extends BaseObject<any> {}

export interface DocumentProps {
  original?: any;

  className?: string;
  style?: React.CSSProperties;

  title?: string;
  description?: string;

  css?: string[];
  js?: string[];
}

export interface Page<T> {
  default: React.ComponentType<T>;
  hooks?: PageHooks<T>;
}

export interface PageHooks<T> {
  hydrateProps?: HydratePropsHook<T>;
  documentProps?: DocumentPropsHook<T>;
}

export type HydratePropsHook<T> = (data: Partial<T>) => T;
export type DocumentPropsHook<T> = (data: T) => DocumentProps;
