export interface BaseObject<T> {
  [key: string]: T;
}

export interface AnyObject extends BaseObject<any> {}