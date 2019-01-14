import { injectable } from 'inversify';

interface PathLocations {
  readonly cwd: string;
  readonly build: string;
  readonly docs: string;
  readonly views: string;
  readonly styles: string;
}

@injectable()
export class Paths implements PathLocations {
  constructor(protected readonly base: PathLocations) {}

  get cwd() {
    return this.base.cwd;
  }

  get build() {
    return this.base.build;
  }

  get docs() {
    return this.base.docs;
  }

  get views() {
    return this.base.views;
  }

  get styles() {
    return this.base.styles;
  }
}
