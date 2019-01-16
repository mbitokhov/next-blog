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

  public cwd(path: string = ''): string {
    return join(this.base.cwd, path);
  }

  public build(path: string = ''): string {
    return join(this.base.cwd, path);
  }

  public docs(path: string = ''): string {
    return join(this.base.cwd, path);
  }

  public views(path: string = ''): string {
    return join(this.base.cwd, path);
  }

  public styles(path: string = ''): string {
    return join(this.base.cwd, path);
  }
}
