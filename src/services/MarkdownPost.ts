import { inject, injectable } from 'inversify';
import { readFile, writeFile } from '../utils/fsHelpers';
import { Paths } from '../utils/Paths';
import { Markdown } from './Markdown';
import { Renderer } from './Renderer';

@injectable()
export class MarkdownPost {
  public buildNamespace = 'markdown';

  constructor(
    @inject(Markdown) protected markdown: Markdown,
    @inject(Renderer) protected react: Renderer,
    @inject(Paths) protected paths: Paths,
  ) {}

  /**
   * Render a file and use cache (if it exists)
   * @param name
   */
  public async renderFileWithCache(name: string, save: boolean = true): Promise<string> {
    try {
      return await this.getCache(name);
    } catch (e) {
      return this.renderFile(name);
    }
  }

  /**
   * Render a file
   */
  public async renderFile(name: string): Promise<string> {
    const file = await readFile(this.paths.docs(name));

    return this.render(file.toString());
  }

  /**
   * Render a given string as though it's markdown.
   */
  public async render(file: string): Promise<string> {
    const markdown = await this.markdown.render(file);

    return this.react.renderReactFile('markdown', {
      data: markdown.html,
      ...markdown.metadata,
    });
  }

  /**
   * Get the cached version of the file (if it exists).
   */
  public async getCache(name: string): Promise<string> {
    return (await readFile(this.paths.build(this.buildNamespace, name))).toString();
  }

  /**
   * Build the cache for a file.
   */
  public async buildCacheFor(name: string): Promise<void> {
    const rendered = await this.renderFile(name);

    return this.writeCache(name, rendered);
  }

  protected async writeCache(name: string, rendered: string): Promise<void> {
    return writeFile(this.paths.build(this.buildNamespace, name), rendered);
  }
}
