import { injectable } from 'inversify';
import { join } from 'path';

interface PathLocations {
  readonly cwd: string;
  readonly build: string;
  readonly docs: string;
  readonly views: string;
  readonly styles: string;
}

@injectable()
export class Paths {
  constructor(protected readonly base: PathLocations) {}

  public cwd(...paths: string[]): string {
    return join(this.base.cwd, ...paths);
  }

  public build(...paths: string[]): string {
    return join(this.base.build, ...paths);
  }

  public docs(...paths: string[]): string {
    return join(this.base.docs, ...paths);
  }

  public views(...paths: string[]): string {
    return join(this.base.views, ...paths);
  }

  public styles(...paths: string[]): string {
    return join(this.base.styles, ...paths);
  }
}
