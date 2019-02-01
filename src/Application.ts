import * as Express from 'express';
import { inject, injectable } from 'inversify';
import { LevelDown } from 'leveldown';
import LevelUp, { LevelUp as LevelUpInterface } from 'levelup';
import { config } from './config';
import { routes } from './routes';
import { MarkdownPost } from './services/MarkdownPost';
import { Paths } from './utils/Paths';

type renderCallback = (err: Error|null, rendered?: string) => void;

@injectable()
export class App {
  constructor(
    @inject(Paths) protected paths: Paths,
    @inject(MarkdownPost) protected markdown: MarkdownPost,
    // @inject(LevelUp) protected level: LevelUpInterface<LevelDown>,
  ) {}

  // public async build(source: string): Promise<void> {
  //   this.markdown.buildCacheFor(source);
  // }

  public async make() {
    const app = Express.default();

    app.set('views', this.paths.views());
    app.use(Express.static(this.paths.public()));
    app.use(routes());

    this.buildEngine(app);

    return app;
  }

  protected buildEngine(app: Express.Application) {
    const viewLength = (app.get('views') as string).length;

    app.engine('md', (filepath: string, options: any, callback: renderCallback) => {
      const filename = filepath.substring(viewLength);

      this.markdown.renderFile(filename)
        .then((file) => callback(null, file))
        .catch((err) => callback(err));
    });
  }
}
